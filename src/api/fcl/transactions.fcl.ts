// @ts-ignore
import * as fcl from '@onflow/fcl';
// @ts-ignore
import * as t from '@onflow/types';
import list_for_sale from '../../cadence/transactions/marketplace/list_for_sale.cdc';
import unlist_from_sale from '../../cadence/transactions/marketplace/unlist_from_sale.cdc';
import setup_nft_collection from '../../cadence/transactions/nft/setup_nft_collection.cdc';
import create_audio_essences from '../../cadence/transactions/essence/create_audio_essences.cdc';
import create_template from '../../cadence/transactions/template/create_template.cdc';
import dapper_setup_duc_fut_receiver from '../../cadence/transactions/nft/dapper_setup_duc_fut_receiver.cdc';
import dapper_create_listing_fut from '../../cadence/transactions/marketplace/dapper_create_listing_fut.cdc';
import dapper_mint_nft_from_template_with_duc_fut from '../../cadence/transactions/nft/mint_nft_from_template_with_duc_fut.cdc';
import mint_nft_from_template_with_fiat_token from '../../cadence/transactions/nft/mint_nft_from_template_with_fiat_token.cdc';
import free_mint_nft_from_template from '../../cadence/transactions/nft/free_mint_nft_from_template.cdc';
import burn_nfts from '../../cadence/transactions/nft/burn_nfts.cdc';
import add_as_child_multisig from '../../cadence/transactions/child_account/add_as_child_multisig.cdc';
import {
  NFTStructReq,
  StrMetadata,
  TemplateStructReq,
} from '../types/fcl.types';
import { getDapperMerchantAddress } from '../../utils/config.web.utils';
import apolloClient from '../apollo/apollo-client';
import {
  PostVerifyCadenceAndGetChildAccountSign,
  ServerVerifyRes,
} from '../types/nft.types';
import { GQL_VERIFY_CADENCE_AND_GET_SERVER_SIGN } from '../graphql/nft.graphql';
import { AuthorizationObject, Signable } from '../../types/signable.types';

export type SafeFclResponse = [string, Error | undefined];
const safeSendFcl = (builders: Array<any>): Promise<SafeFclResponse> => {
  return fcl
    .send(builders)
    .then((res: any) => {
      return fcl
        .decode(res)
        .then((decodedRes: any) => {
          console.info('safeSendFcl transactionId:', decodedRes);
          return [decodedRes, undefined];
        })
        .catch((decodedErr: Error) => {
          return ['', decodedErr];
        });
    })
    .catch((err: Error) => {
      return ['', err];
    });
};

export const setupNFTCollection = async () => {
  const transactionId = await fcl
    .send([
      fcl.transaction(setup_nft_collection),
      fcl.args([]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999),
    ])
    .then(fcl.decode);

  return fcl.tx(transactionId).onceSealed();
};

export const setupNFTCollectionAsync = async () => {
  const res = await fcl
    .send([
      fcl.transaction(setup_nft_collection),
      fcl.args([]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999),
    ])
    .then(fcl.decode);

  return res?.transactionId ?? '';
};

export const createTemplate = (
  recipientAddress: string,
  tem: TemplateStructReq,
) => {
  const royalties = tem?.royalties ?? [];
  const royaltyArg = royalties.map((royalty) => ({
    key: royalty.recipientAddress,
    value: [royalty?.cut ?? null, royalty?.description ?? ''],
  }));

  return safeSendFcl([
    fcl.transaction(create_template),
    // fcl.transaction(create_audio_essence),
    fcl.args([
      fcl.arg(tem?.name ?? '', t.String),
      fcl.arg(tem?.description ?? '', t.String),
      fcl.arg(tem?.maxEdition ?? 0, t.UInt64),
      // maxMintTimesPerAddress
      fcl.arg(1, t.UInt64),
      // maxMintQuantityPerTransaction
      fcl.arg(1, t.UInt64),
      fcl.arg(tem?.priceUSD ?? '0.0', t.UFix64),
      fcl.arg(recipientAddress ? recipientAddress : '', t.Address),
      fcl.arg(
        royaltyArg,
        t.Dictionary({
          key: t.Address,
          value: t.Array([t.UFix64, t.String]),
        }),
      ),
      fcl.arg(tem?.isEnableLimitedQuantity ?? true, t.Bool),
      fcl.arg(tem?.isEnableTimeLock ?? true, t.Bool),
      fcl.arg(tem?.issueStartTime ?? 0, t.UInt64),
      fcl.arg(tem?.issueEndTime ?? 0, t.UInt64),
      fcl.arg(tem.socials, t.Dictionary({ key: t.String, value: t.String })),
      fcl.arg(tem.components, t.Dictionary({ key: t.String, value: t.UInt64 })),
      fcl.arg(
        tem.strMetadata,
        t.Dictionary({ key: t.String, value: t.String }),
      ),
      fcl.arg(tem.intMetadata, t.Dictionary({ key: t.String, value: t.Int64 })),
    ]),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(9999),
  ]);
};

export const createAudioEssences = (nfts: Array<NFTStructReq>) => {
  const len = nfts?.length ?? 0;
  if (!len) throw new Error('Cannot create empty essence');
  const nft = nfts[0];
  const royalties = nft?.royalties ?? [];
  const prices: Array<string> = [];
  const essenceOffChainId: Array<string> = [];
  const limitedEditions: Array<number> = [];
  const metadatas: Array<Array<StrMetadata>> = [];
  const isEnableTimeLocks: Array<boolean> = [];
  const isEnableLimitedQuantities: Array<boolean> = [];
  const issueStartTimes: Array<number> = [];
  const issueEndTimes: Array<number> = [];

  nfts.forEach((n, index) => {
    prices.push(n?.mintPrices ?? '0.0');
    essenceOffChainId.push(n?.essenceOffChainId ?? '');
    limitedEditions.push(n.maxEdition ?? 0);
    metadatas.push(n.metadata);
    isEnableTimeLocks.push(n?.isEnableTimeLock ?? false);
    isEnableLimitedQuantities.push(n?.isEnableLimitedQuantity ?? false);
    issueStartTimes.push(n?.issueStartTime ?? 0);
    issueEndTimes.push(n?.issueEndTime ?? 0);
  });

  console.info('metadatas:', metadatas);

  // royalties.push(mindtrixRoyalty);
  const royaltyArg = royalties.map((royalty) => ({
    key: royalty.recipientAddress,
    // if the cut is null, it could abort the transaction
    value: [royalty?.cut ?? null, royalty?.description ?? ''],
  }));

  return safeSendFcl([
    fcl.transaction(create_audio_essences),
    fcl.args([
      fcl.arg(essenceOffChainId, t.Array(t.String)),
      fcl.arg(limitedEditions, t.Array(t.UInt64)),
      fcl.arg(prices, t.Array(t.UFix64)),
      fcl.arg(
        royaltyArg,
        t.Dictionary({
          key: t.Address,
          value: t.Array([t.UFix64, t.String]),
        }),
      ),
      fcl.arg(
        metadatas,
        t.Array(t.Dictionary({ key: t.String, value: t.String })),
      ),
      fcl.arg(
        nft.socials,
        t.Array(t.Dictionary({ key: t.String, value: t.String })),
      ),
      fcl.arg(isEnableTimeLocks, t.Array(t.Bool)),
      fcl.arg(isEnableLimitedQuantities, t.Array(t.Bool)),
      fcl.arg(issueStartTimes, t.Array(t.UInt64)),
      fcl.arg(issueEndTimes, t.Array(t.UInt64)),
    ]),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(9999),
  ]);
};

export const setupDapperDucFutReceiver = () => {
  return safeSendFcl([
    fcl.transaction(dapper_setup_duc_fut_receiver),
    fcl.args([]),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(9999),
  ]);
};

export const freeMintFromTemplate = (templateId: number) => {
  return safeSendFcl([
    fcl.transaction(free_mint_nft_from_template),
    fcl.args([fcl.arg(templateId, t.UInt64)]),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(9999),
  ]);
};

export const buyNftWithFiatToken = (
  templateId: number,
  paymentIdentifier: string,
) => {
  return safeSendFcl([
    fcl.transaction(mint_nft_from_template_with_fiat_token),
    fcl.args([
      fcl.arg(templateId, t.UInt64),
      fcl.arg(paymentIdentifier, t.String),
    ]),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(9999),
  ]);
};

export const buyNftWithDapperPayment = (templateId: number) => {
  const merchantAddress = getDapperMerchantAddress();

  return safeSendFcl([
    // fcl.transaction(dapper_mint_single_donation_duc),
    fcl.transaction(dapper_mint_nft_from_template_with_duc_fut),
    // fcl.transaction(dapper_mint_nft_from_template_with_flow),
    fcl.args([
      fcl.arg(merchantAddress, t.Address),
      fcl.arg(templateId, t.UInt64),
    ]),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(9999),
  ]);
};

export const createDapperListingFut = (
  saleItemID: number,
  saleItemPrice: string,
  commissionAmount: string,
  marketplacesAddress: Array<string>,
  expiry: number,
  customID: string,
) => {
  return safeSendFcl([
    fcl.transaction(dapper_create_listing_fut),
    fcl.args([
      fcl.arg(saleItemID, t.UInt64),
      fcl.arg(saleItemPrice, t.UFix64),
      fcl.arg(commissionAmount, t.UFix64),
      fcl.arg(marketplacesAddress, t.Array([t.Address])),
      fcl.arg(expiry, t.UInt64),
      fcl.arg(customID, t.String),
    ]),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(9999),
  ]);
};

export const listForSale = async (id: string, price: string) => {
  const transactionId = await fcl
    .send([
      fcl.transaction(list_for_sale),
      fcl.args([fcl.arg(parseInt(id, 10), t.UInt64), fcl.arg(price, t.UFix64)]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999),
    ])
    .then(fcl.decode);

  console.info(transactionId);
  return fcl.tx(transactionId).onceSealed();
};

export const unlistFromSale = async (id: string) => {
  const transactionId = await fcl
    .send([
      fcl.transaction(unlist_from_sale),
      fcl.args([fcl.arg(parseInt(id, 10), t.UInt64)]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999),
    ])
    .then(fcl.decode);

  console.info(transactionId);
  return fcl.tx(transactionId).onceSealed();
};

export const burnNFTs = async (nftIds: Array<number>) => {
  return safeSendFcl([
    fcl.transaction(burn_nfts),
    fcl.args([fcl.arg(nftIds, t.Array(t.UInt64))]),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(9999),
  ]);
};

export const getServerSignature = async (
  parent_email: string,
  signable: Signable,
): Promise<ServerVerifyRes> => {
  console.info('getServerSignature parent_email:', parent_email);
  console.info('getServerSignature signable:', signable);
  const { data: dataRes } =
    await apolloClient.mutate<PostVerifyCadenceAndGetChildAccountSign>({
      mutation: GQL_VERIFY_CADENCE_AND_GET_SERVER_SIGN,
      variables: {
        parent_email,
        signed_payload: JSON.stringify(signable),
        cadence_dir_and_name: 'child_account/add_as_child_multisig.cdc',
      },
    });
  const verifyRes =
    dataRes?.verifyCadenceAndGetChildAccountSign ?? ({} as ServerVerifyRes);
  console.info('getServerSignature verifyRes:', verifyRes);
  return verifyRes;
};

export const getServerAuth = async (
  authObj: AuthorizationObject,
  parentEmail: string,
) => {
  console.info('getServerAuth account:', authObj);
  const serverMultiSignAddress = authObj?.addr ?? '';
  const keyId = 0;

  const signingFunction = async (signable: Signable) => {
    const res = await getServerSignature(parentEmail, signable);
    const isQualified = res?.isQualified ?? false;
    if (!isQualified) {
      console.error('Did not pass the server verification.');
      return {
        addr: null,
        keyId: null,
        signature: null,
      };
    }
    const signature = res?.signature ?? '';
    console.info('signingFunction signature:', signature);

    return {
      addr: fcl.withPrefix(serverMultiSignAddress),
      keyId: Number(keyId),
      signature,
    };
  };

  return {
    ...authObj,
    addr: fcl.sansPrefix(serverMultiSignAddress),
    tempId: `${serverMultiSignAddress}-${keyId}`,
    keyId: Number(keyId),
    signingFunction,
  };
};

export const addChildToParentAccountByMultisig = async (
  serverMultiSignAddress: string,
  parentEmail: string,
) => {
  const serverAuthFn = (authObj: AuthorizationObject) =>
    getServerAuth(
      {
        ...authObj,
        addr: serverMultiSignAddress,
      },
      parentEmail,
    );

  return await safeSendFcl([
    fcl.transaction(add_as_child_multisig),
    fcl.args([]),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz, serverAuthFn]),
    fcl.limit(9999),
  ]);

  // console.info(transactionId);

  // return safeSendFcl([
  //   fcl.transaction(add_as_child_multisig),
  //   fcl.args([]),
  //   fcl.payer(fcl.authz),
  //   fcl.proposer(fcl.authz),
  //   fcl.authorizations([fcl.authz]),
  //   fcl.limit(9999),
  // ]);
};
