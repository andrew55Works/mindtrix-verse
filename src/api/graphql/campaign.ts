import { gql } from '@apollo/client';

export const GQL_FIND_ONE_CAMPAIGN_BY_CAMPAIGN_CODE = gql`
  query findCampaign($dto: CampaignDto!) {
    findCampaign(dto: $dto) {
      _id
      code
      name
      description
      question
      type
      url
      banner_url
      nft_image_preview_url
      audio_firebase_url
      media_post_url
      start_date_time
      end_date_time
      update_date_time
    }
  }
`;
