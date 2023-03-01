import GetMindtrixEssencesScript from '../../cadence/scripts/get_mindtrix_essences.cdc';
import GetMindtrixEssencesByShowGuidScript from '../../cadence/scripts/get_mindtrix_essences_by_show_guid.cdc';
import GetMindtrixTemplateByShowGuidScript from '../../cadence/scripts/get_templates_by_show_guid.cdc';
import GetMindtrixEssenceScript from '../../cadence/scripts/get_mindtrix_essence.cdc';
import GetMindtrixNFTScript from '../../cadence/scripts/get_mindtrix_nft.cdc';
import GetMindtrixNFTsScript from '../../cadence/scripts/get_mindtrix_nfts.cdc';
import GetIsMindtrixInitScript from '../../cadence/scripts/get_is_mindtrix_init.cdc';
import GetIsShowRoyaltyInitScript from '../../cadence/scripts/get_is_show_royalty_init.cdc';
import GetIsFloatInitScript from '../../cadence/scripts/get_is_float_init.cdc';
import GetSingleTemplateOrEssenceById from '../../cadence/scripts/get_single_template_or_essence_by_id.cdc';
import GetBalanceByAddress from '../../cadence/scripts/get_balance_by_address.cdc';
import { fclSafeAwait, SafePromiseType } from '../../utils/api.utils';
import {
  NFTMetadata,
  EssenceStructRes,
  NFTStructRes,
  BalanceDicRes,
} from '../../types/on-chain.type';
import { TemplateStruct } from '../types/fcl.types';

export const getMindtrixEssenceFcl = async (
  essenceId: number,
): Promise<SafePromiseType<EssenceStructRes | undefined, any>> => {
  return fclSafeAwait.query<EssenceStructRes | undefined, any>({
    cadence: GetMindtrixEssenceScript,
    args: (arg, t) => [arg(essenceId, t.UInt64)],
  });
};

export const getMindtrixEssencesFcl = async (): Promise<
  SafePromiseType<NFTMetadata | undefined, any>
> => {
  return fclSafeAwait.query<NFTMetadata | undefined, any>({
    cadence: GetMindtrixEssencesScript,
    args: (arg, t) => [],
  });
};

export const getMindtrixEssencesByShowGuidFcl = async (
  showGuid: string,
): Promise<SafePromiseType<NFTMetadata | undefined, any>> => {
  return fclSafeAwait.query<NFTMetadata | undefined, any>({
    cadence: GetMindtrixEssencesByShowGuidScript,
    args: (arg, t) => [arg(showGuid, t.String)],
  });
};

export const getMindtrixTemplateByShowGuidFcl = async (
  showGuid: string,
  templateTypes: Array<number>,
  templateStatus: Array<number>,
): Promise<SafePromiseType<TemplateStruct | undefined, any>> => {
  return fclSafeAwait.query<TemplateStruct | undefined, any>({
    cadence: GetMindtrixTemplateByShowGuidScript,
    args: (arg, t) => [
      arg(showGuid, t.String),
      arg(templateTypes, t.Array(t.UInt64)),
      arg(templateStatus, t.Array(t.UInt64)),
    ],
  });
};

export const getMindtrixTemplateOrEssenceByIdFcl = async (
  templateOrEssenceId: number,
): Promise<SafePromiseType<TemplateStruct | undefined, any>> => {
  return fclSafeAwait.query<TemplateStruct | undefined, any>({
    cadence: GetSingleTemplateOrEssenceById,
    args: (arg, t) => [arg(templateOrEssenceId, t.UInt64)],
  });
};

export const getMindtrixNFTFcl = async (
  address: string,
  nftId: number,
): Promise<SafePromiseType<NFTMetadata | undefined, any>> => {
  if (!address || !nftId) {
    return [
      { data: undefined },
      new Error('Cannot query nft without providing an address or nftId!'),
    ];
  }
  return fclSafeAwait.query<NFTMetadata | undefined, any>({
    cadence: GetMindtrixNFTScript,
    args: (arg, t) => [arg(address, t.Address), arg(nftId, t.UInt64)],
  });
};

export const getMindtrixNFTsFcl = async (
  address: string,
): Promise<SafePromiseType<Array<NFTStructRes> | undefined, any>> => {
  if (!address) {
    return [
      { data: undefined },
      new Error('Cannot query nft without providing an address!'),
    ];
  }
  return fclSafeAwait.query<Array<NFTStructRes> | undefined, any>({
    cadence: GetMindtrixNFTsScript,
    args: (arg: any, t: any) => [arg(address, t.Address)],
  });
};

export const getIsFloatInitFcl = async (
  address: string,
): Promise<SafePromiseType<boolean | undefined, any>> => {
  if (!address) {
    return [
      { data: undefined },
      new Error('Cannot query float nft without providing an address!'),
    ];
  }
  return fclSafeAwait.query<boolean | undefined, any>({
    cadence: GetIsFloatInitScript,
    args: (arg: any, t: any) => [arg(address, t.Address)],
  });
};

export const getIsMindtrixInitFcl = async (
  address: string,
): Promise<SafePromiseType<boolean | undefined, any>> => {
  if (!address) {
    return [
      { data: undefined },
      new Error('Cannot query nft without providing an address!'),
    ];
  }
  return fclSafeAwait.query<boolean | undefined, any>({
    cadence: GetIsMindtrixInitScript,
    args: (arg: any, t: any) => [arg(address, t.Address)],
  });
};

export const getIsShowRoyaltyInit = async (
  showGuid: string,
): Promise<SafePromiseType<boolean | undefined, any>> => {
  if (!showGuid) {
    return [
      { data: undefined },
      new Error('Cannot query nft without providing an address!'),
    ];
  }
  return fclSafeAwait.query<boolean | undefined, any>({
    cadence: GetIsShowRoyaltyInitScript,
    args: (arg: any, t: any) => [arg(showGuid, t.String)],
  });
};

export const getBalanceByAddress = async (
  address: string,
): Promise<SafePromiseType<BalanceDicRes | undefined, any>> => {
  if (!address) {
    return [
      { data: undefined },
      new Error('Cannot query nft without providing an address!'),
    ];
  }
  return fclSafeAwait.query<BalanceDicRes | undefined, any>({
    cadence: GetBalanceByAddress,
    args: (arg: any, t: any) => [arg(address, t.Address)],
  });
};
