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

export const GQL_GET_SHOW_DIC_BY_SHOW_GUIDS = gql`
  query findShowsByShowGuids($show_guids: [String!]!) {
    findShowsByShowGuids(show_guids: $show_guids) {
      name
      model_name
      description
      distribution_platform {
        name
        platform_id
        url
      }
      category
      creator_id
      creator_name
      create_date_time
      email
      languages
      link
      published_date_time
      rss_generator
      show_guid
      images {
        medium {
          url
        }
      }
    }
  }
`;

export const GQL_GET_ALL_SHOWS = gql`
  query findAllShows {
    findAllShows {
      _id
      creator_id
      name
      description
      category
      creator_name
      create_date_time
      email
      languages
      link
      create_date_time
      published_date_time
      rss_generator
      published_date_time
      show_guid
      images {
        medium {
          url
        }
      }
    }
  }
`;

export const GQL_POST_UPDATE_DISTRIBUTION_PLATFORMS = gql`
  mutation updateDistributionPlatforms(
    $show_guid: String!
    $dto: DistributionPlatformDto!
  ) {
    updateDistributionPlatforms(show_guid: $show_guid, dto: $dto) {
      _id
      show_guid
      creator_id
      name
      distribution_platform {
        platform_id
        url
      }
      create_date_time
      update_date_time
    }
  }
`;
