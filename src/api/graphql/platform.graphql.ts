import { gql } from '@apollo/client';

export const GQL_GET_ALL_PLATFORMS = gql`
  query platforms {
    platforms {
      _id
      name
      description
      domain
      images {
        medium {
          url
        }
      }
      platform_index
      update_date_time
      create_date_time
    }
  }
`;
