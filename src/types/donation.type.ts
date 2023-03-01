import { Show } from '../redux/show/show.interface';
import { Episode } from '../api/types/episode.types';
import { RoyaltyVo } from '../api/types/fcl.types';

export enum DonationSubTabEnum {
  SETTING = 'SETTING',
  INCOME = 'INCOME',
}

export interface DonationIncome {
  amount: number;
  create_date_time: number;
  episode_guid: string;
  episode_name: string;
  message?: string;
  name?: string;
  royalties: Array<RoyaltyVo>;
  show_guid: string;
  transaction_hash: string;
}

export interface DonatedInfo {
  episode: Episode | null;
  show: Show | null;
}
