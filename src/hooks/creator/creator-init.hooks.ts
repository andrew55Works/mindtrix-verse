import { useMutation } from '@apollo/client';
import { GQL_UPDATE_PODCAST_EPISODES } from '../../api/graphql/episode.graphql';
import { SyncPodcastEpisodesRes } from '../../api/types/episode.types';
import { updateCreatorEpisodeAction } from '../../redux/creator/creator.slice';

export const useSyncPodcastEpisodes = (dispatch: React.Dispatch<any>) => {
  const [syncPodcastEpisodesApi] = useMutation<SyncPodcastEpisodesRes>(
    GQL_UPDATE_PODCAST_EPISODES,
  );

  const syncPodcastEpisodes = async (
    creatorId: string,
    rssLink: string,
    showGuid: string,
  ) => {
    if (!creatorId || !rssLink || !showGuid) return;
    const variables = {
      creatorId,
      rssLink,
    };
    const syncPodcastEpisodesRes = await syncPodcastEpisodesApi({
      variables,
    });

    // const show =
    //   syncPodcastEpisodesRes?.data?.syncPodCastsByParsingRss?.show ??
    //   (showDefaultState as Show);

    const episodes =
      syncPodcastEpisodesRes?.data?.syncPodCastsByParsingRss ?? [];
    const isEpisodesExist = episodes.length > 0;
    if (isEpisodesExist) {
      const payload = {
        show_guid: showGuid,
        episodes,
      };
      // dispatch(updateCreatorShowsAction(show));
      dispatch(updateCreatorEpisodeAction(payload));
    }
  };

  return {
    syncPodcastEpisodes,
  };
};
