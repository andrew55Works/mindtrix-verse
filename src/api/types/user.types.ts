import {ChildAccountInfo, CreatorRssInfo} from '../../types/creator.type';
import { CreatorProfile } from '../../redux/creator/creator.interface';
import { DonationVo } from './donation.types';

export interface IUser {
  age: number;
  email: string;
  name: string;
}

export interface PostCreateUserRes {
  createUser: CreatorRssInfo;
}

export interface GetPodCasterInfoByParsingRss {
  getPodCasterInfoByParsingRss: CreatorRssInfo;
}

export interface GetPodCasterByWalletAddress {
  findUserByWalletAddress: Omit<CreatorProfile, 'revenue' | 'shows'>;
}

export interface GetCreatorByWalletAddressRes {
  data: {
    findUserByWalletAddress: CreatorRssInfo;
  };
}
export interface GetCreatorByWalletAddressParam {
  walletAddress: string;
}

export interface GetSignInNonce {
  getSignInNonce: {
    nonce: string;
  };
}

export interface GetConfirmPassword {
  confirmPassword: {
    _id: string;
    isPassed: boolean;
  };
}

export interface PostUpdateCreatorPassword {
  updateUserPassword: {
    _id: string;
    update_date_time: boolean;
  };
}

export interface GetCreatorWalletAddressByCreatorId {
  findCreatorWalletAddressByCreatorId: {
    _id: string;
    address: string;
    name: string;
  };
}

// @deprecated
export interface GetUserChildAddressByEmailRes {
  findUserByEmail: CreatorRssInfo;
}

export interface GetChildAccountByEmailRes {
  findChildAccountByEmail: CreatorRssInfo;
}
