import _get from 'lodash.get';
import {
  EssenceMetadata,
  EssenceStructRes,
  NFTStructRes,
} from '../types/on-chain.type';
import {
  GalleryEssenceCardVo,
  GalleryShowCardVo,
  ShowDic,
} from '../components/gallery/gallery-cards-in-grid/gallery-cards.in-grid.interface';
import { Show } from '../redux/show/show.interface';
import {
  convertNumberCodeToNFTEnum,
  NFT_ENUM,
} from '../api/types/nft-enum.types';
import {
  NFTPodcastAudioEssenceDto,
  NFTPodcastImageCoverDto,
} from '../api/types/nft.types';
import { TemplateStruct } from '../api/types/fcl.types';
import { getFlowCadenceContractAddress } from './config.web.utils';
import { getTokenIdentifiers } from './token.utils';
import {toDecimalWith2ndPlace} from "./num.utils";

export const ModelConverter = {
  essencesMetadataAndShowToEssenceCardVos: (
    essencesMetadata: Array<EssenceStructRes>,
    showDic: ShowDic,
  ): Array<GalleryEssenceCardVo> => {
    return essencesMetadata.map((essence) => {
      const currentShowGuid = essence?.metadata?.showGuid ?? '';
      const show = showDic[currentShowGuid];
      const essenceCardVo: GalleryEssenceCardVo = {
        _id: essence?.essenceId ?? '',
        nftId: '',
        cardPrimaryTitle: essence?.metadata?.essenceName ?? '',
        cardSecondaryTitle: show?.name ?? '',
        creatorModelName: show?.model_name ?? '',
        currentEditionIndex: Number(essence?.currentEdition ?? '0'),
        editionCapacity: Number(essence?.maxEdition ?? '0'),
        showImgURL: show?.images?.medium?.url ?? '',
        essenceAudioURL: essence?.metadata?.essenceFilePreviewUrl ?? '',
        essenceTypeEnum: convertNumberCodeToNFTEnum(
          Number(essence?.metadata?.essenceTypeSerial ?? '1'),
        ),
        essenceImgURL:
          essence?.metadata?.essenceImagePreviewUrl ??
          '/img/img_audio_essence.jpg',
        creatorId: show?.creator_id ?? '',
        creatorName: show?.creator_name ?? '',
        showId: show?.show_guid ?? '',
        showName: show?.name ?? '',
        price: _get(essence, ['mintPrices', 'flow', 'price'], 0),
      };
      return essenceCardVo;
    });
  },
  essenceDtoToShowCardVo: (
    essences: Array<NFTPodcastAudioEssenceDto | NFTPodcastImageCoverDto>,
    show: Show,
  ): Array<GalleryEssenceCardVo> => {
    return essences.map((essence) => {
      const essenceCardVo: GalleryEssenceCardVo = {
        _id: essence?._id ?? '',
        nftId: '',
        cardPrimaryTitle: essence?.nft_name ?? '',
        cardSecondaryTitle: show?.name ?? '',
        creatorModelName: show?.model_name ?? '',
        // TODO: nft_minted_quantity should be set in the DB
        currentEditionIndex: essence?.nft_minted_quantity ?? 0,
        editionCapacity: essence?.nft_edition_quantity ?? 0,
        showImgURL: show?.images?.medium?.url ?? '',
        essenceAudioURL: essence?.storage_link ?? '',
        essenceTypeEnum: essence?.nft_type ?? NFT_ENUM.TYPE.PODCAST_IMAGE_COVER,
        essenceImgURL: '/img/img_audio_essence.jpg',
        creatorId: show?.creator_id ?? '',
        creatorName: show?.creator_name ?? '',
        showId: show?.show_guid ?? '',
        showName: show?.name ?? '',
        price: _get(essence, ['prices', 'flow', 'price'], 0),
      };
      return essenceCardVo;
    });
  },
  templateStructToShowCardVo: (
    essenceStructs: Array<TemplateStruct>,
    show: Show,
  ): Array<GalleryEssenceCardVo> => {
    const ducIdentifier = getTokenIdentifiers().duc;
    return essenceStructs.map((template) => ({
      _id: (template?.templateId ?? 0).toString(),
      nftId: '',
      cardPrimaryTitle: _get(template, ['strMetadata', 'essenceName'], ''),
      cardSecondaryTitle: show?.name ?? '',
      creatorModelName: show?.model_name ?? '',
      currentEditionIndex: Number(template?.currentEdition ?? 0) ?? 0,
      editionCapacity: Number(template?.maxEdition ?? 0),
      showImgURL: show?.images?.medium?.url ?? '',
      essenceAudioURL: _get(
        template,
        ['strMetadata', 'essenceFilePreviewUrl'],
        '',
      ),
      essenceTypeEnum: convertNumberCodeToNFTEnum(
        Number(_get(template, ['strMetadata', 'essenceTypeSerial'], '2')),
      ),
      essenceImgURL: _get(
        template,
        ['strMetadata', 'essenceImagePreviewUrl'],
        '',
      ),
      creatorId: show?.creator_id ?? '',
      creatorName: show?.creator_name ?? '',
      showId: show?.show_guid ?? '',
      showName: show?.name ?? '',
      price: _get(template, ['mintPrice', ducIdentifier, 'price'], 0),
    }));
  },
  nftStructToShowCardVo: (
    nftStructs: Array<NFTStructRes>,
    showDic: ShowDic,
  ): Array<GalleryEssenceCardVo> => {
    return nftStructs.map((nft) => {
      const showGuid = nft?.metadata?.showGuid ?? '';
      const show = showDic[showGuid];
      return {
        _id: nft?.essenceId ?? '',
        nftId: nft?.nftId ?? '',
        cardPrimaryTitle: nft?.metadata.collectionName ?? '',
        cardSecondaryTitle: show?.name ?? '',
        creatorModelName: show?.model_name ?? '',
        currentEditionIndex: Number(nft?.metadata?.nftEditionSerial ?? 0) ?? 0,
        editionCapacity: Number(nft?.metadata.maxEdition ?? 0),
        showImgURL: show?.images?.medium?.url ?? '',
        essenceAudioURL: nft?.metadata.nftFilePreviewUrl ?? '',
        essenceTypeEnum: convertNumberCodeToNFTEnum(
          Number(nft?.metadata?.essenceTypeSerial ?? '2'),
        ),
        essenceImgURL: nft?.metadata?.nftImagePreviewUrl,
        creatorId: show?.creator_id ?? '',
        creatorName: show?.creator_name ?? '',
        showId: show?.show_guid ?? '',
        showName: show?.name ?? '',
        price: _get(nft, ['mintPrices', 'flow', 'price'], 0),
      };
    });
  },
  showDicToShowCardVo: (showDic: ShowDic): Array<GalleryShowCardVo> => {
    return Object.keys(showDic).map((showGuid) => {
      const show = showDic[showGuid];
      return {
        _id: show?.show_guid ?? '',
        nftId: '',
        categories: [show?.category ?? ''],
        cardPrimaryTitle: show?.name ?? '',
        cardSecondaryTitle: show?.creator_name ?? '',
        creatorId: show?.creator_id ?? '',
        creatorName: show?.creator_name ?? '',
        showId: show?.show_guid ?? '',
        showName: show?.name ?? '',
        nftQuantity: {
          PODCAST_AUDIO_SEGMENT: 10,
          PODCAST_IMAGE_COVER: 10,
        },
        showImgURL: show?.images?.medium?.url ?? '',
      };
    });
  },
  showsToShowCardVo: (shows: Array<Show>): Array<GalleryShowCardVo> => {
    return shows.map((show) => {
      return {
        _id: show?.show_guid ?? '',
        nftId: '',
        categories: [show?.category ?? ''],
        cardPrimaryTitle: show?.name ?? '',
        cardSecondaryTitle: show?.creator_name ?? '',
        creatorId: show?.creator_id ?? '',
        creatorName: show?.creator_name ?? '',
        showId: show?.show_guid ?? '',
        showName: show?.name ?? '',
        nftQuantity: {
          PODCAST_AUDIO_SEGMENT: 10,
          PODCAST_IMAGE_COVER: 10,
        },
        showImgURL: show?.images?.medium?.url ?? '',
      };
    });
  },
};
