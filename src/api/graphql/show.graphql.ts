import { gql } from '@apollo/client';

export const GQL_GET_SINGLE_SHOW_BY_SHOW_GUID = gql`
  query findShowByShowGuid($show_guid: String!) {
    findShowByShowGuid(show_guid: $show_guid) {
      name
      category
      creator_id
      creator_name
      create_date_time
      description
      distribution_platform {
        name
        platform_id
        url
      }
      email
      languages
      link
      published_date_time
      show_guid
      model_name
      images {
        medium {
          url
        }
      }
    }
  }
`;
