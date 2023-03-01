import { gql } from '@apollo/client';

export const GQL_GET_ALL_ESSENCES_GROUP_BY_EPISODE_GUID = gql`
  query findAllEssencesGroupByEpisodeGuid(
    $show_guid: String!
    $nft_types: [NFTTypeEnum!]!
    $order_by: String
    $order: OrderEnum
    $nft_name: String
  ) {
    findAllEssencesGroupByEpisodeGuid(
      show_guid: $show_guid
      nft_types: $nft_types
      order_by: $order_by
      order: $order
      nft_name: $nft_name
    ) {
      episode_guid
      nft_type
      list_status
      generator
      name
      description
    }
  }
`;

export const GQL_GET_ESSENCE_BY_ESSENCE_UUID = gql`
  query findEssencesByUuid($essence_uuid: Float!) {
    findEssencesByUuid(essence_uuid: $essence_uuid) {
      nft_name
      nft_description
      nft_list_type
      nft_type
      nft_collection_name
      nft_edition_quantity
      nft_list_start_date_time
      nft_list_end_date_time
      nft_image_preview_link
      essence_uuid
      storage_link
      image_storage_link
      show {
        _id
        creator_id
        name
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
        model_name
        distribution_platform {
          platform_id
          name
          url
        }
      }
    }
  }
`;

export const GQL_GET_ALL_ESSENCES_BY_SHOW_GUID = gql`
  query findAllNFTsByShowGuid(
    $show_guid: String!
    $nft_types: [NFTTypeEnum!]!
    $order_by: String
    $order: OrderEnum
    $nft_name: String
  ) {
    findAllNFTsByShowGuid(
      show_guid: $show_guid
      nft_types: $nft_types
      order_by: $order_by
      order: $order
      nft_name: $nft_name
    ) {
      _id
      audio_start_time
      audio_start_time_num
      audio_end_time
      audio_end_time_num
      show_guid
      episode_guid
      generator
      list_status
      nft_cid
      nft_name
      nft_type
      nft_index
      nft_list_type
      nft_list_price
      nft_description
      nft_edition_id
      nft_edition_quantity
      nft_list_start_date_time
      nft_list_end_date_time
      storage_link
      image_link
      image_storage_link
      updated_date_time
      create_date_time
    }
  }
`;

export const GQL_GET_NFTS_BY_EPISODE_GUID_AND_NFT_TYPE = gql`
  query findNFTsByEpisodeGuidAndNFTType(
    $episode_guid: String!
    $nft_types: [NFTTypeEnum!]!
    $order_by: String
    $order: OrderEnum
    $nft_name: String
  ) {
    findNFTsByEpisodeGuidAndNFTType(
      episode_guid: $episode_guid
      nft_types: $nft_types
      order_by: $order_by
      order: $order
      nft_name: $nft_name
    ) {
      _id
      audio_start_time
      audio_start_time_num
      audio_end_time
      audio_end_time_num
      audio_duration
      episode_guid
      essence_uuid
      generator
      list_status
      nft_cid
      nft_name
      nft_type
      nft_index
      nft_list_type
      nft_list_price
      nft_description
      nft_edition_id
      nft_edition_quantity
      nft_list_start_date_time
      nft_list_end_date_time
      nft_minted_uuid
      storage_link
      image_link
      image_storage_link
      updated_date_time
      create_date_time
    }
  }
`;

export const GQL_POST_OR_PUT_NFT_PODCAST_AUDIO_SEGMENT_DRAFTS = gql`
  mutation createOrUpdateNFTPodcastAudioSegmentDraftsFromEpisodeGuid(
    $episode_guid: String!
    $dtos: [NFTPodcastAudioSegmentDto!]!
  ) {
    createOrUpdateNFTPodcastAudioSegmentDraftsFromEpisodeGuid(
      episode_guid: $episode_guid
      dtos: $dtos
    ) {
      _id
      audio_start_time
      audio_start_time_num
      audio_end_time
      audio_end_time_num
      episode_guid
      storage_link
      list_status
      generator
      nft_cid
      nft_name
      nft_type
      nft_list_type
      nft_list_price
      nft_description
      nft_edition_id
      nft_edition_quantity
      nft_list_start_date_time
      nft_list_end_date_time
      nft_minted_uuid
      create_date_time
      updated_date_time
    }
  }
`;

export const GQL_POST_PUT_NFT_PODCAST_IMAGE_COVER_DRAFTS = gql`
  mutation createOrUpdateNFTPodcastImageCoverDraftsFromEpisodeGuid(
    $episode_guid: String!
    $dtos: [NFTPodcastImageCoverDto!]!
  ) {
    createOrUpdateNFTPodcastImageCoverDraftsFromEpisodeGuid(
      episode_guid: $episode_guid
      dtos: $dtos
    ) {
      _id
      episode_guid
      list_status
      nft_cid
      nft_name
      nft_type
      nft_list_type
      nft_list_price
      nft_description
      nft_edition_id
      nft_edition_quantity
      nft_list_start_date_time
      nft_list_end_date_time
      nft_minted_uuid
      create_date_time
      updated_date_time
      storage_link
      image_link
      image_storage_link
    }
  }
`;

export const GQL_DELETE_ONE_NFT_DRAFT_BY_ID = gql`
  mutation deleteOneNFTById($_id: String!) {
    deleteOneNFTById(_id: $_id) {
      _id
      audio_start_time
      audio_start_time_num
      audio_end_time
      audio_end_time_num
      episode_guid
      list_status
      nft_cid
      nft_name
      nft_type
      nft_index
      nft_list_type
      nft_list_price
      nft_description
      nft_edition_id
      nft_edition_quantity
      nft_list_start_date_time
      nft_list_end_date_time
      nft_minted_uuid
      storage_link
      image_link
      image_storage_link
      updated_date_time
      create_date_time
    }
  }
`;

export const GQL_DELETE_NFT_DRAFTS_BY_EPISODE_GUID_AND_NFT_TYPES = gql`
  mutation deleteNFTsByEpisodeGuidAndNFTTypes(
    $episode_guid: String!
    $nft_types: [NFTTypeEnum!]!
  ) {
    deleteNFTsByEpisodeGuidAndNFTTypes(
      episode_guid: $episode_guid
      nft_types: $nft_types
    ) {
      _id
      audio_start_time
      audio_start_time_num
      audio_end_time
      audio_end_time_num
      episode_guid
      list_status
      nft_cid
      nft_name
      nft_type
      nft_index
      nft_list_type
      nft_list_price
      nft_description
      nft_edition_id
      nft_edition_quantity
      nft_list_start_date_time
      nft_list_end_date_time
      storage_link
      image_link
      image_storage_link
      updated_date_time
      create_date_time
    }
  }
`;

export const GQL_MINT_SINGLE_NFT_FROM_ESSENCE = gql`
  mutation mintSingleNFTFromEssence($essenceId: Float!, $recipient: String!) {
    mintSingleNFTFromEssence(essenceId: $essenceId, recipient: $recipient) {
      transactionId
      status
      statusCode
      statusString
      errorMessage
    }
  }
`;

export const GQL_MINT_SINGLE_NFT_FROM_POAP_ESSENCE = gql`
  mutation mintSingleNFTFromPOAPEssence(
    $essenceId: Float!
    $recipient: String!
    $nftAudioPreviewUrl: String!
  ) {
    mintSingleNFTFromPOAPEssence(
      essenceId: $essenceId
      recipient: $recipient
      nftAudioPreviewUrl: $nftAudioPreviewUrl
    ) {
      transactionId
      status
      statusCode
      statusString
      errorMessage
    }
  }
`;

export const GQL_MINT_SINGLE_NFT_FROM_DONATION = gql`
  mutation mintSingleNFTFromDonation(
    $creatorAddress: String!
    $donorAddress: String!
    $metadata: [ExtraMetadataVo!]!
    $mintPrice: String!
    $offChainedId: String!
    $royalties: [NFTRoyaltyVo!]!
    $socials: [SocialVo!]!
  ) {
    mintSingleNFTFromDonation(
      creatorAddress: $creatorAddress
      donorAddress: $donorAddress
      metadata: $metadata
      mintPrice: $mintPrice
      offChainedId: $offChainedId
      royalties: $royalties
      socials: $socials
    ) {
      transactionId
      status
      statusCode
      statusString
      errorMessage
    }
  }
`;

export const GQL_BATCH_MINT_PODCAST_EPISODE_ESSENCE_NFT = gql`
  mutation batchMintForPodcastEpisodeEssence($nfts: [NFTMetaDto!]!) {
    batchMintForPodcastEpisodeEssence(nfts: $nfts) {
      transactionId
      status
      statusCode
      statusString
      errorMessage
    }
  }
`;

export const GQL_BATCH_MINT_PODCAST_EPISODE_COVER_NFT = gql`
  mutation batchMintForPodcastEpisodeCover($nft: NFTMetaDto!) {
    batchMintForPodcastEpisodeCover(nft: $nft) {
      transactionId
      status
      statusCode
      statusString
      errorMessage
    }
  }
`;

export const GQL_UPDATE_NFT_LIST_STATUS_TO_CREATED = gql`
  mutation updateNFTListStatusToCreated($_ids: [String!]!) {
    updateNFTListStatusToCreated(_ids: $_ids) {
      nft_name
      nft_description
      nft_list_type
      nft_edition_quantity
      essence_uuid
      list_status
    }
  }
`;

export const GQL_FIND_TEMPLATE_OR_ESSENCE_BY_ID = gql`
  query findTemplateOrEssenceById($template_or_essence_id: Float!) {
    findTemplateOrEssenceById(template_or_essence_id: $template_or_essence_id)
  }
`;

export const GQL_VERIFY_CADENCE_AND_GET_SERVER_SIGN = gql`
  mutation verifyCadenceAndGetChildAccountSign(
    $parent_email: String!
    $signed_payload: String!
    $cadence_dir_and_name: String!
  ) {
    verifyCadenceAndGetChildAccountSign(
      parent_email: $parent_email
      signed_payload: $signed_payload
      cadence_dir_and_name: $cadence_dir_and_name
    ) {
      signature
      message
      isQualified
    }
  }
`;
