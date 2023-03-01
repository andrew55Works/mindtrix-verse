import { CurrencyUserSetting, RoyaltyDonationVo } from './donation.types';

export class DonationSettingDto {
  public description?: string = undefined;
  public is_enable = false;
  public prices?: Array<CurrencyUserSetting> = [];
  public royalties: Array<RoyaltyDonationVo> = [];
}

export class DonationSetting {
  public create_date_time: Date | null = null;
  public description?: string = undefined;
  public is_enable = false;
  public prices?: Array<CurrencyUserSetting> = [];
  public royalties: Array<RoyaltyDonationVo> = [];
  public update_date_time: Date | null = null;
}

export class UserSettingDto {
  public donation = new DonationSettingDto();
  public user_id: string | null = null;
}

export class UserSettingVo {
  public _id: string | null = null;
  public create_date_time: Date | null = null;
  public donation = new DonationSetting();
  public update_date_time: Date | null = null;
  public user_id: string | null = null;
  public user_setting_index?: number = undefined;
}

export interface CreateOrUpdateUserDonationSettingRes {
  createOrUpdateUserSetting: UserSettingVo;
}

export interface GetUserSettingByUserIdRes {
  getUserSettingByUserId: UserSettingVo;
}
