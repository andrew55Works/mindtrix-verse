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

export const GQL_UPDATE_PODCAST_EPISODES = gql`
  mutation syncPodCastsByParsingRss($creatorId: String!, $rssLink: String!) {
    syncPodCastsByParsingRss(creatorId: $creatorId, rssLink: $rssLink) {
      episode_index
      name
      show_guid
      creator_name
      episode_guid
      description
      duration
      link
      firebase_file_url
      file_url
      ipfs_cid
      sale_status
      sale_type
      audio_detail {
        audio_id
        audio_cid
        audio_name
        audio_description
        audio_link
        audio_duration
        audio_start_time
        audio_end_time
        audio_creator_name
        audio_sale_start_date_time
        audio_sale_end_date_time
        audio_list_price
        audio_issue_quantity
        audio_sale_type
        audio_sale_status
      }
      image_detail {
        image_cid
        image_creator_name
        image_name
        image_description
        image_link
        image_storage_link
        image_sale_start_date_time
        image_sale_end_date_time
        image_list_price
        image_issue_quantity
        image_sale_type
        image_sale_status
      }
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
