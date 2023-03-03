import { RoyaltyVo } from './fcl.types';

export class CurrencyUserSetting {
  public code: string | null = null;
  // if null, the price will be presented as free in the frontend
  public price?: number = undefined;
}

export interface RoyaltyDonationVo {
  address: string;
  cut: number; // ex: 0.3
  description: string;
}

export class DonationVo {
  public _id: string | null = null;
  public create_date_time: Date | null = null;
  public creator_id: string | null = null;
  public donation_index?: number = undefined;
  public donor_address: string | null = null;
  public donor_message?: string = undefined;
  public donor_name?: string | null = null;
  public episode_guid: string | null = null;
  public nft_uuid?: number = undefined;
  public preview_link: string | null = null;
  public prices?: Array<CurrencyUserSetting> = [];
  public royalties: Array<RoyaltyVo> = [];
  public show_guid: string | null = null;
  public transaction_address?: string | null = null;
  public update_date_time: Date | null = null;
}

export class DonationDto {
  public creator_id: string | null = null;
  public donor_address: string | null = null;
  public donor_message?: string | null = null;
  public donor_name?: string | null = null;
  public episode_guid: string | null = null;
  public nft_uuid?: number = undefined;
  public preview_link: string | null = null;
  public prices?: Array<CurrencyUserSetting> = [];
  public royalties: Array<RoyaltyDonationVo> = [];
  public show_guid: string | null = null;
  public transaction_address?: string = undefined;
}

export interface CreateDonationRes {
  createDonation: DonationVo;
}

export interface GetDonationByIdRes {
  findDonationByDonationId: DonationVo;
}
