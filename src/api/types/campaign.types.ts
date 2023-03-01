export interface CampaignByCampaignCode {
  findCampaign: Campaign;
}

export interface Campaign {
  _id?: string;
  audio_firebase_url: string;
  banner_url: string;
  code: string;
  description: string;
  end_date_time?: string;
  name: string;
  media_post_url?: string;
  nft_image_preview_url: string;
  question: string;
  start_date_time?: string;
  type: string;
  update_date_time?: string;
  url: string;
}

export const defaultCampaign: Campaign = {
  _id: '',
  audio_firebase_url: '',
  banner_url: '',
  code: '',
  description: '',
  end_date_time: '',
  name: '',
  nft_image_preview_url: '',
  question: '',
  start_date_time: '',
  type: '',
  update_date_time: '',
  url: '',
};
