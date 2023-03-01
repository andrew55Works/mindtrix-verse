import { gql } from '@apollo/client';

export const GQL_POST_CREATE_OR_UPDATE_USER_DONATION_SETTING = gql`
  mutation createOrUpdateUserSetting($dto: UserSettingDto!) {
    createOrUpdateUserSetting(dto: $dto) {
      _id
      user_setting_index
      donation {
        is_enable
        royalties {
          address
          cut
          description
        }
        prices {
          code
          price
        }
        create_date_time
        update_date_time
      }
      create_date_time
      update_date_time
    }
  }
`;

export const GQL_QUERY_GET_USER_SETTING_BY_USER_ID = gql`
  query getUserSettingByUserId($user_id: String!) {
    getUserSettingByUserId(user_id: $user_id) {
      _id
      user_id
      user_setting_index
      donation {
        is_enable
        royalties {
          address
          cut
          description
        }
        prices {
          code
          price
        }
        description
        create_date_time
        update_date_time
      }
      create_date_time
      update_date_time
    }
  }
`;
