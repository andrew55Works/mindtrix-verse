import { createSelector } from 'reselect';
import { _get } from '../../utils/lodash.utils';
import { RootState } from '../root.reducer';
import { Show } from '../show/show.interface';

const selectedState = (state: RootState) =>
  state.encryptedSessionStorage.creatorSlice;

export const selectCreatorProfile = createSelector(
  [selectedState],
  (creatorSlice) => creatorSlice.creatorProfile,
);

export const selectCreatorAddress = createSelector(
  [selectedState],
  (creatorSlice) => creatorSlice?.creatorProfile?.wallet?.blocto?.address ?? '',
);

export const selectIsWalletConnected = createSelector(
  [selectedState],
  (creatorSlice) => {
    return creatorSlice?.creatorProfile?.wallet?.blocto?.loggedIn ?? false;
  },
);

export const selectIsCreatorSignIn = createSelector(
  [selectedState],
  (creatorSlice) => {
    const creator = creatorSlice?.creatorProfile ?? null;
    const isConnectedWallet = creator?.wallet?.blocto?.loggedIn ?? false;
    const isWalletExist = !!(creator?.wallet?.blocto?.address ?? null);
    const isSignedInMindtrix = !!(creator?._id ?? null);
    return isConnectedWallet && isWalletExist && isSignedInMindtrix;
  },
);

export const selectCreatorShowObj = createSelector(
  [selectedState],
  (creatorSlice) => creatorSlice.creatorProfile.shows,
);

export const selectCreatorShowByShowGuid = createSelector(
  [selectedState, (state, show_guid: string) => show_guid],
  (creatorSlice, show_guid) => {
    const shows = _get(creatorSlice, ['creatorProfile', 'shows'], null) as {
      [show_guid: string]: Show;
    };
    if (!shows) return null;
    return _get(shows, [show_guid], null) as Show;
  },
);

export const selectCreatorDefaultShowModelName = createSelector(
  [selectedState],
  (creatorSlice) => {
    const shows = _get(creatorSlice, ['creatorProfile', 'shows'], null) as {
      [show_guid: string]: Show;
    };
    if (!shows) return '';
    const show_guids = Object.keys(shows);
    if ((show_guids?.length ?? 0) < 1) return '';
    const show_guid = _get(show_guids, ['0'], '') as string;
    const show = _get(shows, [show_guid], null) as Show;
    return show?.model_name ?? '';
  },
);

export const selectCreatorShowGuids = createSelector(
  [selectedState],
  (creatorSlice) => Object.keys(creatorSlice.creatorProfile.shows ?? []),
);

export const selectCreatorDefaultShowGuid = createSelector(
  [selectedState],
  (creatorSlice) => {
    const showGuids = Object.keys(creatorSlice.creatorProfile.shows ?? []);
    const isExist = !!showGuids && showGuids?.length > 0;
    return isExist ? showGuids[0] : '';
  },
);

export const selectCreatorEpisodeObjByDefault = createSelector(
  [selectedState],
  (creatorSlice) => {
    const shows = creatorSlice.creatorProfile?.shows ?? {};
    const hasKeysInShows = !!Object.keys(shows).length;
    if (hasKeysInShows) {
      const defaultShowGuid = Object.keys(shows)[0];
      return shows[defaultShowGuid]?.episodes ?? {};
    } else {
      return {};
    }
  },
);

export const selectCreatorEpisodesByDefault = createSelector(
  [selectedState],
  (creatorSlice) => {
    const shows = creatorSlice.creatorProfile?.shows ?? {};
    const hasKeysInShows = !!Object.keys(shows).length;
    if (hasKeysInShows) {
      const defaultShowGuid = Object.keys(shows)[0];
      const episodeObj = shows[defaultShowGuid]?.episodes ?? {};
      return (
        Object.keys(episodeObj)
          ?.map((key: string) => episodeObj[key])
          ?.sort((a, b) => {
            return (
              new Date(b?.published_date_time ?? 0).getTime() -
              new Date(a?.published_date_time ?? 0).getTime()
            );
          }) ?? []
      );
    } else {
      return [];
    }
  },
);

export const selectCreatorEpisodesByShowGuid = (showGuid: string) =>
  createSelector([selectedState], (creatorSlice) => {
    const shows = creatorSlice.creatorProfile?.shows ?? {};
    if (showGuid in shows) {
      const episodeObj = shows[showGuid]?.episodes ?? {};
      return (
        Object.keys(episodeObj)?.map((key: string) => episodeObj[key]) ?? []
      );
    } else {
      return [];
    }
  });
