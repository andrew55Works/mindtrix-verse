import { gql } from '@apollo/client';

export const GQL_POST_CREATE_DONATION = gql`
  mutation createDonation($dto: DonationDto!) {
    createDonation(dto: $dto) {
      _id
      creator_id
      nft_uuid
      donation_index
      donor_address
      donor_name
      donor_message
      episode_guid
      show_guid
      preview_link
      royalties {
        address
        cut
        description
      }
      prices {
        code
        price
      }
      transaction_address
      create_date_time
      update_date_time
    }
  }
`;

export const GQL_GET_DONATIONS_BY_CREATOR_ID = gql`
  query findDonationsByCreatorId($creator_id: String!) {
    findDonationsByCreatorId(creator_id: $creator_id) {
      _id
      creator_id
      nft_uuid
      donation_index
      donor_address
      donor_name
      donor_message
      episode_guid
      show_guid
      preview_link
      royalties {
        address
        cut
        description
      }
      prices {
        code
        price
      }
      transaction_address
      create_date_time
      update_date_time
    }
  }
`;
export const GQL_GET_DONATION_BY_DONATION_ID = gql`
  query findDonationByDonationId($donation_id: String!) {
    findDonationByDonationId(donation_id: $donation_id) {
      _id
      creator_id
      nft_uuid
      donation_index
      donor_address
      donor_name
      donor_message
      royalties {
        address
        cut
        description
      }
      prices {
        code
        price
      }
      transaction_address
      create_date_time
      update_date_time
    }
  }
`;
