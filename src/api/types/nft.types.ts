import { Images } from '../../components/navigation/top-navigation.component';
import { LIST_ENUM, LIST_ENUM_TYPE } from './list-enum.types';
import { NFT_ENUM, NFT_ENUM_TYPE } from './nft-enum.types';
import { Episode } from './episode.types';
import { Show } from '../../redux/show/show.interface';
import { CreatorProfile } from '../../redux/creator/creator.interface';

export interface NFTDto {
  _id?: string | null;
  create_date_time?: string;
  creator_id: string;
  essence_uuid: number;
  generator: string;
  nft_author_name: string;
  nft_cid: string;
  nft_collection_avatar: string;
  nft_collection_name: string;
  nft_description: string;
  nft_edition_id: string;
  nft_edition_quantity: number;
  nft_external_url?: string;
  nft_has_claimed?: boolean;
  nft_image_preview_link?: string;
  nft_ipfs_link: string;
  nft_license?: string;
  nft_list_end_date_time?: string;
  nft_list_price: number;
  nft_list_start_date_time?: string;
  nft_list_type: string;
  nft_minted_quantity: number;
  nft_minted_uuid?: string;
  nft_name: string;
  nft_reach_claimed_limitation?: boolean;
  nft_type: NFT_ENUM_TYPE;
  nft_video_preview_link?: string;
  updated_date_time?: string;
}

export interface NftEssenceGroup extends Episode {
  generator: string;
  list_status: LIST_ENUM_TYPE;
  nft_type: NFT_ENUM_TYPE;
}

export interface NFTPodcastDto extends NFTDto {
  episode_guid: string;
  file_url?: string;
  images?: Images;
  list_status: LIST_ENUM_TYPE;
  show_guid: string;
  storage_link?: string;
}

export interface NFTPodcastAudioEssenceDto extends NFTPodcastDto {
  audio_duration?: number;
  audio_end_time?: string;
  audio_end_time_num?: number;
  audio_start_time?: string;
  audio_start_time_num?: number;
}

export interface NFTPodcastImageCoverDto extends NFTPodcastDto {
  image_link?: string;
  image_storage_link?: string;
}

export interface NFTEssence
  extends NFTPodcastImageCoverDto,
    NFTPodcastAudioEssenceDto {
  show: Show;
}

export interface NFTEssenceV2
  extends NFTPodcastImageCoverDto,
    NFTPodcastAudioEssenceDto {}

export interface PostOrPutNFTPodcastAudioSegmentDraftsRes {
  createOrUpdateNFTPodcastAudioSegmentDraftsFromEpisodeGuid: Array<NFTPodcastAudioEssenceDto>;
}

export interface PostOrPutNFTPodcastImageCoverDraftsRes {
  createOrUpdateNFTPodcastImageCoverDraftsFromEpisodeGuid: Array<NFTPodcastImageCoverDto>;
}

export interface GetAllEssencesGroupByEpisodeGuidRes {
  findAllEssencesGroupByEpisodeGuid: Array<NftEssenceGroup>;
}

export interface GetAllEssencesByShowGuidRes {
  findAllNFTsByShowGuid: Array<
    NFTPodcastAudioEssenceDto | NFTPodcastImageCoverDto
  >;
}

export interface GetNFTsByEpisodeGuidAndNFTTypeRes {
  findNFTsByEpisodeGuidAndNFTType: Array<
    NFTPodcastAudioEssenceDto | NFTPodcastImageCoverDto
  >;
}

export interface DeleteNFTDraftByIdRes {
  deleteOneNFTById: NFTDto;
}
export interface DeleteNFTDraftsByEpisodeGuidAndNFTTypes {
  deleteNFTsByEpisodeGuidAndNFTTypes: Array<NFTDto>;
}

export interface TxRes {
  errorMessage: string;
  status: number;
  statusCode: number;
  statusString: string;
  transactionId: string;
}

export interface MintSingleNFTFromEssence {
  mintSingleNFTFromEssence: TxRes;
}

export interface MintSingleNFTFromPOAPEssence {
  mintSingleNFTFromPOAPEssence: TxRes;
}

export interface MintSingleNFTFromDonation {
  mintSingleNFTFromDonation: TxRes;
}

export interface MintPodcastEpisodeCoverNFTRes {
  batchMintForPodcastEpisodeCover: TxRes;
}

export interface MintPodcastEpisodeEssenceNFTRes {
  batchMintForPodcastEpisodeEssence: TxRes;
}

export interface UpdateNFTListStatusToCreatedRes {
  updateNFTListStatusToCreated: Array<NFTPodcastAudioEssenceDto>;
}

export interface GetEssenceByEssenceUuid {
  findEssencesByUuid: NFTEssence;
}

export interface GetTemplateOrEssenceById {
  findTemplateOrEssenceById: string;
}
export interface ServerVerifyRes {
  isQualified: boolean;
  message: string | null;
  signature: string | null;
}
export interface PostVerifyCadenceAndGetChildAccountSign {
  verifyCadenceAndGetChildAccountSign: ServerVerifyRes;
}

export interface PostCreateSsoUserAndBindChildWalletAccountRes {
  createSsoUserAndBindChildWalletAccountFromMindtrix: TxRes & CreatorProfile;
}

export const initialImageEssenceDto: NFTPodcastImageCoverDto = {
  _id: null,
  create_date_time: '',
  episode_guid: '',
  essence_uuid: 0,
  list_status: LIST_ENUM.STATUS.NONE,
  show_guid: '',
  creator_id: '',
  generator: '',
  nft_minted_quantity: 0,
  nft_author_name: '',
  nft_cid: '',
  nft_collection_avatar: '',
  nft_collection_name: '',
  nft_description: '',
  nft_edition_id: '',
  nft_edition_quantity: 0,
  nft_ipfs_link: '',
  nft_image_preview_link: '',
  nft_video_preview_link: '',
  nft_list_end_date_time: '',
  nft_list_price: 0,
  nft_list_start_date_time: '0',
  nft_list_type: '',
  nft_name: '',
  nft_type: NFT_ENUM.TYPE.PODCAST_IMAGE_COVER,
  updated_date_time: '',
};
