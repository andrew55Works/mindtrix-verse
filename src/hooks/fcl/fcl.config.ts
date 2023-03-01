import * as fcl from '@onflow/fcl';
import {
  getFlowCadenceContractAddress,
  getFlowEnv,
} from '../../utils/config.web.utils';

export enum WalletShowEnum {
  ONLY_DAPPER = 'ONLY_DAPPER',
  EXCLUDE_DAPPER = 'EXCLUDE_DAPPER',
  ALL = 'ALL',
}
const contracts = getFlowCadenceContractAddress();
const flowEnv = getFlowEnv();
const config = (
  resolver: () => { appIdentifier: string; nonce: string },
  walletShowEnum: WalletShowEnum,
) => ({
  ...(walletShowEnum === WalletShowEnum.ONLY_DAPPER
    ? {
        'discovery.wallet': flowEnv.DAPPER_WALLET_DISCOVERY,
        'discovery.wallet.method': flowEnv.DAPPER_WALLET_DISCOVERY_METHOD,
      }
    : walletShowEnum === WalletShowEnum.EXCLUDE_DAPPER
    ? {
        'discovery.wallet': flowEnv.WALLET_DISCOVERY,
        'discovery.wallet.method': null,
        'discovery.authn.include': [],
      }
    : {
        'discovery.wallet': flowEnv.WALLET_DISCOVERY,
        'discovery.authn.endpoint': flowEnv.WALLET_DISCOVERY,
        'discovery.authn.include': [flowEnv.DAPPER_WALLET_AUTHN_ADDRESS],
      }),
  'app.detail.title': 'Mindtrix',
  'app.detail.icon': 'https://i.ibb.co/d6VDDJK/mindtrix-logo.png',
  'accessNode.api': flowEnv.FLOW_ACCESS_API_URL,
  env: flowEnv.FLOW_ENV,
  'fcl.accountProof.resolver': resolver,
  'flow.network': flowEnv.FLOW_ENV,
  '0xMindtrixNFT': contracts.MINDTRIX_NFT_ADDRESS,
  '0xMindtrixEssence': contracts.MINDTRIX_ESSENCE_ADDRESS,
  '0xMindtrixNFTVerifier': contracts.MINDTRIX_NFT_VERIFIER,
  '0xMindtrixMarketplace': contracts.MINDTRIX_MARKETPLACE_ADDRESS,
  '0xFungibleToken': contracts.FUNGIBLE_TOKEN_ADDRESS,
  '0xDapperToken': contracts.DAPPER_WALLET_AUTHN_ADDRESS,
  '0xNonfungibleToken': contracts.NON_FUNGIBLE_TOKEN_ADDRESS,
  '0xMetadataViews': contracts.METADATA_VIEWS_ADDRESS,
  '0xChildAccount': contracts.CHILD_ACCOUNT_ADDRESS,
  '0xForwarding': contracts.TOKEN_FORWARDING_ADDRESS,
  '0xFlowToken': contracts.FLOW_TOKEN_ADDRESS,
  '0xFusdToken': contracts.FUSD_TOKEN_ADDRESS,
  '0xFiatToken': contracts.FIAT_TOKEN_ADDRESS,
});

export const fclInit = (nonce: string, walletShowEnum: WalletShowEnum) => {
  const resolver = () => ({
    appIdentifier: 'Mindtrix',
    nonce,
  });
  fcl.config(config(resolver, walletShowEnum));
};
