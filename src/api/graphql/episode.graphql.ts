import { gql } from '@apollo/client';

export const GQL_GET_EPISODES_BY_SHOW_GUID = gql`
  query findEpisodesByShowGuid($show_guid: String!) {
    findEpisodesByShowGuid(show_guid: $show_guid) {
      name
      show_guid
      episode_guid
      description
      firebase_file_url
      file_url
      ipfs_cid
      link
      create_date_time
      updated_date_time
      published_date_time
      images {
        medium {
          url
        }
      }
    }
  }
`;

