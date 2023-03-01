import { Episode } from '../../api/types/episode.types';
import { useQuery } from '@apollo/client';
import {
  GetNFTsByEpisodeGuidAndNFTTypeRes,
  NFTPodcastImageCoverDto,
} from '../../api/types/nft.types';
import { GQL_GET_NFTS_BY_EPISODE_GUID_AND_NFT_TYPE } from '../../api/graphql/nft.graphql';
import { useEffect, useState } from 'react';
import { NFT_ENUM } from '../../api/types/nft-enum.types';
import { _cloneDeep } from '../../utils/lodash.utils';
import { useAppDispatch } from '../../redux/store';
import { addOrUpdateImageEssenceDraftAction } from '../../redux/essence/essence.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root.reducer';
import { selectImageEssenceDraft } from '../../redux/essence/essence.selector';
import { LIST_ENUM } from '../../api/types/list-enum.types';
import { PAGE_URL } from '../../utils/page-router.utils';
import { useRouter } from 'next/router';

export const useImageEssenceOfAnEpisodeDataSource = (
  selectedEpisode: Episode | null,
) => {
  const episode_guid = selectedEpisode?.episode_guid ?? '';
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isEssenceCreated, setIsEssenceCreated] = useState(false);
  const { refetch: getRemoteDrafts, loading: isLoadingNFTLists } =
    useQuery<GetNFTsByEpisodeGuidAndNFTTypeRes>(
      GQL_GET_NFTS_BY_EPISODE_GUID_AND_NFT_TYPE,
      {
        skip: true,
      },
    );
  const localStorageImageEssenceDraft = useSelector((state: RootState) =>
    selectImageEssenceDraft(state, episode_guid),
  );
  useEffect(() => {
    const fetchRemoteDrafts = async () => {
      try {
        setIsLoading(true);
        if (!episode_guid) return;
        const variablesOfFetchingRemoteDrafts = {
          episode_guid,
          nft_types: [NFT_ENUM.TYPE.PODCAST_IMAGE_COVER],
          order: 'DESC',
          order_by: 'update_date_time',
        };

        const remoteDraftRes = await getRemoteDrafts(
          variablesOfFetchingRemoteDrafts,
        );

        const remoteEssenceDraftsTmp = (remoteDraftRes?.data
          ?.findNFTsByEpisodeGuidAndNFTType ??
          []) as Array<NFTPodcastImageCoverDto>;
        const isRemoteDataExist = (remoteEssenceDraftsTmp?.length ?? 0) > 0;
        if (isRemoteDataExist) {
          const remoteImageEssence = _cloneDeep(
            remoteEssenceDraftsTmp[0],
          ) as NFTPodcastImageCoverDto;
          const isEssenceCreatedTmp =
            remoteImageEssence?.list_status ===
            LIST_ENUM.STATUS.ESSENCE_CREATED;
          setIsEssenceCreated(isEssenceCreatedTmp);
          // @ts-ignore
          delete remoteImageEssence.__typename;
          delete remoteImageEssence.create_date_time;
          delete remoteImageEssence.updated_date_time;
          // @ts-ignore
          delete remoteImageEssence.nft_index;
          const isLocalStorageImageEssenceExist = !!(
            localStorageImageEssenceDraft?.nft_name ?? ''
          );
          // const imageEssenceDraft = isLocalStorageImageEssenceExist
          //   ? localImageEssence
          //   : remoteImageEssence;
          dispatch(
            addOrUpdateImageEssenceDraftAction({
              imageEssence: remoteImageEssence,
              episode_guid,
            }),
          );
        } else {
          setIsEssenceCreated(false);
        }
      } catch (e) {
        console.error('fetchRemoteDrafts error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRemoteDrafts();
  }, [episode_guid]);

  return {
    isEssenceCreated,
    isLoading,
    imageEssenceDraft: localStorageImageEssenceDraft,
    setIsLoading,
  };
};
