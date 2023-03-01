import { IndexPath } from '@ui-kitten/components/devsupport';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { EpisodeSelectItem } from '../../api/types/episode.types';

export const useInitEssenceSelector = (
  onSelectEpisode: (index: IndexPath | Array<IndexPath> | undefined) => void,
  episodeSelectItems: Array<EpisodeSelectItem>,
) => {
  const router = useRouter();
  const episodeGuidQueries = (router.query.episode_guid as Array<string>) || [
    '',
  ];
  const episodeGuidQuery = episodeGuidQueries[0];
  const isTriggerOnce = useRef(false);
  useEffect(() => {
    if (
      !episodeGuidQuery ||
      !episodeSelectItems ||
      (episodeSelectItems?.length ?? 0) === 0 ||
      isTriggerOnce.current
    )
      return;
    const preSelectIndex = episodeSelectItems.findIndex((item, index) => {
      const itemGuid = item?.episode_guid ?? '';
      return itemGuid === episodeGuidQuery;
    });
    isTriggerOnce.current = true;
    const isEpisodeExist = preSelectIndex >= 0;
    const indexPath = isEpisodeExist
      ? new IndexPath(preSelectIndex, undefined)
      : undefined;
    onSelectEpisode(indexPath);
  }, [episodeGuidQuery, episodeSelectItems]);
  return { episodeGuidQuery };
};

export const useInitEssenceSelectorByEpisodeGuid = (
  onSelectEpisode: (index: IndexPath | Array<IndexPath> | undefined) => void,
  episodeSelectItems: Array<EpisodeSelectItem>,
  episodeGuid: string,
) => {
  const isTriggerOnce = useRef(false);
  useEffect(() => {
    if (
      !episodeGuid ||
      !episodeSelectItems ||
      (episodeSelectItems?.length ?? 0) === 0 ||
      isTriggerOnce.current
    )
      return;
    const preSelectIndex = episodeSelectItems.findIndex((item, index) => {
      const itemGuid = item?.episode_guid ?? '';
      return itemGuid === episodeGuid;
    });
    isTriggerOnce.current = true;
    const isEpisodeExist = preSelectIndex >= 0;
    const indexPath = isEpisodeExist
      ? new IndexPath(preSelectIndex, undefined)
      : undefined;
    onSelectEpisode(indexPath);
  }, [episodeGuid, episodeSelectItems]);
};
