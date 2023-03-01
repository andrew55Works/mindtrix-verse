import { Episode } from '../../api/types/episode.types';
import { NFT_ENUM } from '../../api/types/nft-enum.types';
import { useQuery } from '@apollo/client';
import {
  GetNFTsByEpisodeGuidAndNFTTypeRes,
  NFTPodcastAudioEssenceDto,
} from '../../api/types/nft.types';
import { GQL_GET_NFTS_BY_EPISODE_GUID_AND_NFT_TYPE } from '../../api/graphql/nft.graphql';
import { NFTPodcastAudioEssenceVo } from '../../redux/essence/essence.interface';
import { useSelector } from 'react-redux';
import { selectAudioEssenceDraftObj } from '../../redux/essence/essence.selector';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import {
  addOrUpdateAudioSegmentDraftToListAction,
  AudioEssenceDrafts,
} from '../../redux/essence/essence.slice';
import { RootState } from '../../redux/root.reducer';
import { LIST_ENUM } from '../../api/types/list-enum.types';

export const useAudioEssenceOfAnEpisodeDataSource = (
  selectedEpisode: Episode | null,
) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isEssenceCreated, setIsEssenceCreated] = useState(false);
  const isFetchOnceRef = useRef(false);
  const episode_guid = selectedEpisode?.episode_guid ?? '';
  const show_guid = selectedEpisode?.show_guid ?? '';
  const localStorageEssenceDraftObj = useSelector((state: RootState) =>
    selectAudioEssenceDraftObj(state, episode_guid),
  );
  const isSkipFetchRemoteRef = useRef(false);
  const isStoreAudioEssencesIntoSliceRef = useRef(false);
  const audioEssenceObj = {} as AudioEssenceDrafts;
  const [remoteAudioEssenceDrafts, setRemoteAudioEssenceDrafts] = useState<
    Array<NFTPodcastAudioEssenceDto>
  >([]);
  const { refetch: getRemoteDrafts, loading: isLoadingNFTLists } =
    useQuery<GetNFTsByEpisodeGuidAndNFTTypeRes>(
      GQL_GET_NFTS_BY_EPISODE_GUID_AND_NFT_TYPE,
      {
        skip: true,
      },
    );
  useEffect(() => {
    const fetchRemoteDrafts = async () => {
      if (!episode_guid || (isFetchOnceRef?.current ?? false)) return;
      setIsLoading(true);
      const variablesOfFetchingRemoteDrafts = {
        episode_guid,
        nft_types: [NFT_ENUM.TYPE.PODCAST_AUDIO_SEGMENT],
        order: 'DESC',
        order_by: 'update_date_time',
      };
      const remoteDraftRes = await getRemoteDrafts(
        variablesOfFetchingRemoteDrafts,
      );
      setIsLoading(false);
      const remoteAudioEssenceDraftsTmp = (remoteDraftRes?.data
        ?.findNFTsByEpisodeGuidAndNFTType ??
        []) as Array<NFTPodcastAudioEssenceDto>;
      setRemoteAudioEssenceDrafts(remoteAudioEssenceDraftsTmp);
      const isRemoteDataExist = (remoteAudioEssenceDraftsTmp?.length ?? 0) > 0;
      if (isRemoteDataExist) {
        isSkipFetchRemoteRef.current = true;
        const isEssenceCreatedTmp =
          remoteAudioEssenceDraftsTmp?.some(
            (audio) => audio.list_status === LIST_ENUM.STATUS.ESSENCE_CREATED,
          ) ?? false;
        setIsEssenceCreated(isEssenceCreatedTmp);
      } else {
        setIsEssenceCreated(false);
      }
    };
    fetchRemoteDrafts();
  }, [episode_guid]);

  remoteAudioEssenceDrafts.forEach((draft, index) => {
    const table_order = index + 1;
    const table_id_str = table_order.toString();
    const model = {
      ...draft,
      table_order,
      table_id: table_id_str,
      show_guid,
    } as NFTPodcastAudioEssenceVo;
    // @ts-ignore
    delete model.__typename;
    delete model.create_date_time;
    delete model.updated_date_time;
    // @ts-ignore
    delete model.image_link;
    // @ts-ignore
    delete model.image_storage_link;
    // @ts-ignore
    delete model.nft_index;
    audioEssenceObj[table_id_str] = model;
  });

  const isLocalStorageEssenceDraftsExist =
    !!localStorageEssenceDraftObj &&
    (Object.keys(localStorageEssenceDraftObj)?.length ?? 0) > 0;

  const isRemoteStorageEssenceDraftsExist =
    remoteAudioEssenceDrafts && (remoteAudioEssenceDrafts?.length ?? 0) > 0;
  const isFirstLoadLocalStorage =
    isLocalStorageEssenceDraftsExist && !isRemoteStorageEssenceDraftsExist;
  if (isFirstLoadLocalStorage) {
    Object.keys(localStorageEssenceDraftObj).forEach((tableIdStr) => {
      audioEssenceObj[tableIdStr] = localStorageEssenceDraftObj[tableIdStr];
    });
  }

  const audioEssenceDrafts = Object.keys(audioEssenceObj).map(
    (tableIdStr) => audioEssenceObj[tableIdStr],
  );
  const audioEssenceQuantity = audioEssenceDrafts?.length ?? 0;

  // update localStorage
  if (
    !(isStoreAudioEssencesIntoSliceRef?.current ?? false) &&
    isRemoteStorageEssenceDraftsExist
  ) {
    isStoreAudioEssencesIntoSliceRef.current = true;
    dispatch(
      addOrUpdateAudioSegmentDraftToListAction({
        audioEssences: audioEssenceDrafts,
        episode_guid,
      }),
    );
  }
  const isAudioEssenceExist =
    !!audioEssenceDrafts && (audioEssenceDrafts?.length ?? 0) > 0;
  const largestTableOrder = isAudioEssenceExist
    ? Math.max(
        ...(audioEssenceDrafts?.map((audio) => audio?.table_order ?? 0) ?? [0]),
      )
    : 0;
  return {
    audioEssenceDrafts,
    audioEssenceQuantity,
    largestTableOrder,
    isEssenceCreated,
    isLoading,
    setIsLoading,
  };
};
