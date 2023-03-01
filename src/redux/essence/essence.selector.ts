import { createSelector } from 'reselect';
import { RootState } from '../root.reducer';
import { audioEssenceDefaultState } from './essence.interface';
import { getLastTableOrderNumber } from './essence.slice';

const selectedState = (state: RootState) =>
  state.encryptedSessionStorage.essenceSlice;

export const selectAudioEssenceDraftObj = createSelector(
  [selectedState, (state, episode_guid: string) => episode_guid],
  (essenceSlice, episode_guid) => {
    return essenceSlice?.audioEssenceDrafts[episode_guid] ?? {};
  },
);

export const selectImageEssenceDraft = createSelector(
  [selectedState, (state, episode_guid: string) => episode_guid],
  (essenceSlice, episode_guid) => {
    const obj = essenceSlice?.imageEssenceDrafts[episode_guid] ?? {};
    return obj['1'];
  },
);

export const selectIsImageEssenceDraftExistInAnEpisode = createSelector(
  [selectedState, (state, episode_guid: string) => episode_guid],
  (essenceSlice, episode_guid) => {
    const obj = essenceSlice?.imageEssenceDrafts[episode_guid] ?? {};
    const name = obj['1']?.nft_name ?? null;
    const isExist = !!obj && '1' in obj && !!name;
    return isExist;
  },
);

export const selectAudioEssenceDrafts = createSelector(
  [selectedState, (state, episode_guid: string) => episode_guid],
  (essenceSlice, episode_guid) => {
    const obj = essenceSlice?.audioEssenceDrafts[episode_guid] ?? {};
    console.info(
      'essenceSlice?.audioEssenceDrafts:',
      essenceSlice?.audioEssenceDrafts,
    );
    return Object.keys(obj).map((table_id_str) => obj[table_id_str]);
  },
);

export const selectLargestTableOrderFromAudioEssenceDrafts = createSelector(
  [selectedState, (state, episode_guid: string) => episode_guid],
  (essenceSlice, episode_guid) => {
    return getLastTableOrderNumber(essenceSlice, episode_guid);
  },
);

export const selectAudioEssenceCurrentInputs = createSelector(
  [selectedState],
  (essenceSlice) =>
    essenceSlice?.audioEssenceCurrentInputs ?? audioEssenceDefaultState,
);

export const selectQuantityOfAudioEssenceDraft = createSelector(
  [selectedState],
  (essenceSlice) => essenceSlice?.audioEssenceDrafts?.length ?? 0,
);
