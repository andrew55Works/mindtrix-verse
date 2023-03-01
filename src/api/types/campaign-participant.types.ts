import { VoiceTrait } from '../../utils/audio-random-analysis';

export interface CampaignParticipantRes {
  createOrUpdateCampaignParticipant: CampaignParticipant;
}

export interface CampaignParticipantByCampaignCodeAndWalletAddressRes {
  findOneCampaignParticipantByCampaignCodeAndWalletAddress: CampaignParticipant;
}

export interface CampaignParticipant {
  _id?: string;
  campaign_code: string;
  create_date_time?: string;
  is_claimed_nft: boolean;
  participant_audio_cid: string;
  participant_audio_firebase_url: string;
  participant_message: string;
  participant_name: string;
  participant_nft_uuid: number;
  participant_voice_traits: Array<Pick<VoiceTrait, 'percentage' | 'key'>>;
  participant_wallet_address: string;
  update_date_time?: string;
}
