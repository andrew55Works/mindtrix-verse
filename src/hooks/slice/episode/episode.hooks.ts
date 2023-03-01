import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { IndexPath } from '@ui-kitten/components/devsupport';
import { useSelector } from 'react-redux';
import {
  selectCreatorEpisodesByDefault,
  selectCreatorProfile,
} from '../../../redux/creator/creator.selector';
import { Episode, EpisodeSelectItem } from '../../../api/types/episode.types';
import { getFileFromImgUrl } from '../../../utils/img.utils';
import { usePrevious } from '../../utils/previous.hooks';

export const useEpisodeBySelectedIndex = (
  episodesFromRemote?: Array<Episode>,
) => {
  const [episodeSelectedIndex, setEpisodeSelectedIndex] = React.useState<
    IndexPath | Array<IndexPath> | undefined
  >(undefined);
  const creator = useSelector(selectCreatorProfile);
  const episodesFromLocalStorage = useSelector(selectCreatorEpisodesByDefault);
  const episodesWithNullableCid =
    episodesFromRemote && (episodesFromRemote?.length ?? 0) > 0
      ? episodesFromRemote
      : episodesFromLocalStorage;
  const episodes =
    episodesWithNullableCid?.filter((e) => !!e.ipfs_cid) ??
    episodesWithNullableCid;
  const currentSelectIndexPath = episodeSelectedIndex as IndexPath;
  const currentSelectIndexNum = currentSelectIndexPath?.row ?? undefined;
  const episodeSelectedIndexPrev = usePrevious(episodeSelectedIndex);
  const [defaultEpisodeImgFile, setDefaultEpisodeImgFile] =
    useState<File | null>(null);

  const selectedEpisode: Episode | null =
    currentSelectIndexNum !== undefined
      ? episodes[currentSelectIndexNum]
      : null;
  const selectedItems =
    episodes.map(
      (episode: Episode) =>
        ({
          name: episode?.name ?? '',
          episode_guid: episode?.episode_guid ?? '',
        } as EpisodeSelectItem),
    ) ?? [];
  const onSelectEpisode = (index: IndexPath | Array<IndexPath> | undefined) => {
    setEpisodeSelectedIndex(index);
  };
  const defaultEpisodeImgUrl = selectedEpisode?.images?.medium?.url ?? '';

  // 從 Image Input 抓 url 的用意，繞過圖片 cors 問題
  const onImgLoaded = async (
    e: SyntheticEvent<HTMLDivElement>,
    customImgUrl: string,
  ) => {
    const isSwitchedEpisode = episodeSelectedIndexPrev !== episodeSelectedIndex;
    const _defaultImgUrl = selectedEpisode?.images?.medium?.url ?? '';
    const episode_guid = selectedEpisode?.episode_guid ?? null;
    const isExist = !!episode_guid && !!_defaultImgUrl;
    const isSkip = !!(customImgUrl || !isExist || !isSwitchedEpisode);
    if (isSkip) return;
    const imageUrl = e?.target?.currentSrc ?? '';

    const defaultImgFile = await getFileFromImgUrl(
      imageUrl,
      selectedEpisode?.episode_guid ?? '',
    );
    console.info('onImgLoaded defaultImgFile:', defaultImgFile);
    setDefaultEpisodeImgFile(defaultImgFile);
  };

  return {
    creator,
    episode: {
      defaultEpisodeImgUrl,
      defaultEpisodeImgFile,
      selectedEpisode,
    },
    onImgLoaded,
    onSelectEpisode,
    select: {
      episodeSelectedIndex,
      selectItems: selectedItems,
    },
  };
};

export const useDraftImgFile = (storage_link: string, episode_guid: string) => {
  const [draftImgFile, setDraftImgFile] = useState<File | null>(null);
  const isInitOnce = useRef(false);
  const episodeGuidPrev = usePrevious(episode_guid);

  useEffect(() => {
    const isSwitchedEpisode = episodeGuidPrev !== episode_guid;
    if (isSwitchedEpisode) {
      setDraftImgFile(null);
      isInitOnce.current = false;
    }
  }, [episodeGuidPrev, episode_guid]);

  useEffect(() => {
    const getFile = async () => {
      if (!storage_link || (isInitOnce?.current ?? false)) return;
      isInitOnce.current = true;
      const defaultImgFile = await getFileFromImgUrl(
        storage_link,
        episode_guid,
      );
      setDraftImgFile(defaultImgFile);
    };
    getFile();
  }, [storage_link]);
  return {
    draftImgFile,
  };
};
