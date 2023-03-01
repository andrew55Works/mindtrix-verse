import { NFTPodcastAudioEssenceDto } from '../../api/types/nft.types';
import { LIST_ENUM } from '../../api/types/list-enum.types';
import { NFT_ENUM } from '../../api/types/nft-enum.types';
import { imagesDefaultState } from '../../components/navigation/top-navigation.component';

export enum LIST_STATUS_ENUM {
  LIMITED_EDITION = 'LIMITED_EDITION',
}

export interface AudioEssence {
  description: string;
  endTimeSec: number;
  id: string | null;
  issueQuantity: number;
  listPrice: number;
  listType: LIST_STATUS_ENUM;
  name: string;
  order: number;
  startTimeSec: number;
}

export interface NFTPodcastAudioEssenceVo extends NFTPodcastAudioEssenceDto {
  audio_end_time_num: number;
  audio_start_time_num: number;
  table_id: string;
  table_order: number;
}

export const audioEssenceDefaultState: NFTPodcastAudioEssenceVo = {
  _id: null,
  audio_end_time_num: 0,
  audio_start_time_num: 0,
  creator_id: '',
  generator: '',
  nft_author_name: '',
  nft_ipfs_link: '',
  nft_collection_avatar: '',
  nft_collection_name: '',
  nft_cid: '',
  nft_description: '',
  nft_edition_id: '',
  nft_edition_quantity: 0,
  nft_list_end_date_time: 0,
  nft_list_price: 0,
  nft_list_start_date_time: 0,
  nft_list_type: LIST_ENUM.TYPE.FIXED_PRICE,
  nft_name: '',
  nft_type: NFT_ENUM.TYPE.PODCAST_AUDIO_SEGMENT,
  episode_guid: '',
  table_id: '0',
  table_order: 0,
  file_url: '',
  images: imagesDefaultState,
  list_status: LIST_ENUM.STATUS.DRAFT,
  show_guid: '',
  audio_duration: 0,
  audio_end_time: '',
  audio_start_time: '',
};
