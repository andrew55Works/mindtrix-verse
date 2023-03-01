import { gql } from '@apollo/client';

export const GQL_FIND_ONE_CAMPAIGN_PARTICIPANT_BY_CANPAIGN_CODE_AND_WALLET_ADDRESS = gql`
  query findOneCampaignParticipantByCampaignCodeAndWalletAddress(
    $dto: CampaignParticipantDto!
  ) {
    findOneCampaignParticipantByCampaignCodeAndWalletAddress(dto: $dto) {
      _id
      campaign_code
      participant_wallet_address
      participant_name
      participant_message
      participant_audio_firebase_url
      participant_audio_cid
      participant_nft_uuid
      participant_voice_traits {
        percentage
        key
      }
      is_claimed_nft
      create_date_time
    }
  }
`;

export const GQL_CREATE_OR_UPDATE_CAMPAIGN_PARTICIPANT = gql`
  mutation createOrUpdateCampaignParticipant($dto: CampaignParticipantDto!) {
    createOrUpdateCampaignParticipant(dto: $dto) {
      _id
      campaign_code
      participant_wallet_address
      participant_name
      participant_message
      participant_voice_traits {
        percentage
        key
      }
      participant_audio_firebase_url
      participant_audio_cid
      participant_nft_uuid
      is_claimed_nft
      create_date_time
    }
  }
`;
