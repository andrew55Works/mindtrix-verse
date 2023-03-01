import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  audioEssenceDefaultState,
  NFTPodcastAudioEssenceVo,
} from './essence.interface';
import { PURGE } from 'redux-persist';
import { _cloneDeep } from '../../utils/lodash.utils';
import { NFTPodcastImageCoverDto } from '../../api/types/nft.types';
import update from 'immutability-helper';

export interface EssenceSliceState {
  audioEssenceCurrentInputs: NFTPodcastAudioEssenceVo;
  audioEssenceDrafts: AudioEssenceDraftsInAnEpisode;
  imageEssenceDrafts: ImageEssenceDraftsInAnEpisode;
}

export type AudioEssenceDrafts = {
  [table_id: string]: NFTPodcastAudioEssenceVo | null;
};

type AudioEssenceDraftsInAnEpisode = {
  [episode_guid: string]: AudioEssenceDrafts;
};

export type ImageEssenceDrafts = {
  [table_id: string]: NFTPodcastImageCoverDto | null;
};

type ImageEssenceDraftsInAnEpisode = {
  [episode_guid: string]: ImageEssenceDrafts;
};

const initialState: EssenceSliceState = {
  audioEssenceCurrentInputs: audioEssenceDefaultState,
  audioEssenceDrafts: {},
  imageEssenceDrafts: {},
};

export interface ImageEssenceDraftDto {
  episode_guid: string;
  imageEssence: NFTPodcastImageCoverDto | null;
}

export const getLastTableOrderNumber = (
  state: EssenceSliceState,
  episode_guid: string,
): number => {
  try {
    const essenceObjFromOrgEpisode =
      state?.audioEssenceDrafts[episode_guid] ?? {};
    const tableOrderIdKeys = Object.keys(essenceObjFromOrgEpisode);
    if (!tableOrderIdKeys || tableOrderIdKeys?.length < 1) return 1;
    const lastTableOrderId = Math.max(
      ...Object.keys(essenceObjFromOrgEpisode).map((order_id) =>
        Number(order_id),
      ),
    );
    return lastTableOrderId;
  } catch (e) {
    console.error('getLastTable error:', e);
    return 0;
  }
};

const putEssenceAudioDraftReducer = (
  state: EssenceSliceState,
  audioEssence: NFTPodcastAudioEssenceVo | null,
) => {
  const episode_guid = audioEssence?.episode_guid ?? null;
  const table_order_number = Number(audioEssence?.table_id ?? '0');
  if (!episode_guid || !table_order_number) {
    throw Error(
      `The following data could not be empty\nepisode_guid:${episode_guid}\ntable_order_number:${table_order_number}`,
    );
  }
  return {
    ...state,
    audioEssenceDrafts: {
      ...state.audioEssenceDrafts,
      [episode_guid]: {
        ...state.audioEssenceDrafts[episode_guid],
        [table_order_number]: audioEssence,
      },
    },
  };
};

const addEssenceAudioDraftReducer = (
  state: EssenceSliceState,
  audioEssence: NFTPodcastAudioEssenceVo | null,
) => {
  const episode_guid = audioEssence?.episode_guid ?? null;
  if (!episode_guid) {
    throw Error(
      `The following data could not be empty\nepisode_guid:${episode_guid}`,
    );
  }
  const table_order_number = Number(audioEssence?.table_order ?? 0);
  const lastTableOrderNumber = !!table_order_number
    ? table_order_number
    : getLastTableOrderNumber(state, episode_guid);
  return {
    ...state,
    audioEssenceDrafts: {
      ...state.audioEssenceDrafts,
      [episode_guid]: {
        ...state.audioEssenceDrafts[episode_guid],
        [lastTableOrderNumber]: audioEssence,
      },
    },
  };
};

const addOrUpdateAudioSegmentDraftToListReducer: CaseReducer<
  EssenceSliceState,
  PayloadAction<{
    audioEssences: Array<NFTPodcastAudioEssenceVo | null>;
    episode_guid: string;
  }>
> = (state, action) => {
  const audioEssences = action?.payload?.audioEssences ?? [];
  const episode_guid = action?.payload?.episode_guid ?? null;
  if (!episode_guid) {
    throw new Error(`The episode_guid should not be empty:${episode_guid}`);
  }
  const updatedAudioEssenceObj = {} as AudioEssenceDrafts;
  audioEssences.forEach((audioEssence) => {
    const table_order_number = Number(audioEssence?.table_order ?? 0);
    updatedAudioEssenceObj[table_order_number] = audioEssence;
  });
  return {
    ...state,
    audioEssenceDrafts: {
      ...state.audioEssenceDrafts,
      [episode_guid]: {
        ...state.audioEssenceDrafts[episode_guid],
        ...updatedAudioEssenceObj,
      },
    },
  };
};

const addOrUpdateImageEssenceDraftReducer: CaseReducer<
  EssenceSliceState,
  PayloadAction<ImageEssenceDraftDto>
> = (state, action) => {
  const imageEssence = action?.payload.imageEssence ?? null;
  const episode_guid = action?.payload?.episode_guid ?? null;
  if (!episode_guid) {
    throw new Error(`The episode_guid should not be empty:${episode_guid}`);
  }
  const updatedImageEssenceObj: ImageEssenceDrafts = {
    '1': imageEssence,
  };
  return {
    ...state,
    imageEssenceDrafts: {
      ...state.imageEssenceDrafts,
      [episode_guid]: {
        ...state.imageEssenceDrafts[episode_guid],
        ...updatedImageEssenceObj,
      },
    },
  };
};

const clearEditingAudioSegmentReducer: CaseReducer<EssenceSliceState> = (
  state,
) => ({
  ...state,
  audioEssenceCurrentInputs: initialState.audioEssenceCurrentInputs,
});

const clearAudioSegmentReducer: CaseReducer<EssenceSliceState> = (state) =>
  initialState;

const removeAudioEssenceDraftFromEpisodeReducer: CaseReducer<
  EssenceSliceState,
  PayloadAction<{ episode_guid: string; table_order_id_str: string }>
> = (state, action) => {
  try {
    const episode_guid = action?.payload?.episode_guid ?? '';
    const table_order_id_str = action?.payload?.table_order_id_str ?? '';
    if (!episode_guid || !table_order_id_str) return state;
    const deletedAudioEssenceDrafts = _cloneDeep(
      state.audioEssenceDrafts,
    ) as AudioEssenceDraftsInAnEpisode;
    delete deletedAudioEssenceDrafts[episode_guid][table_order_id_str];
    return {
      ...state,
      audioEssenceDrafts: deletedAudioEssenceDrafts,
    };
  } catch (e) {
    console.error('removeAudioSegmentDraftFromListReducer error:', e);
    return state;
  }
};

const removeImageEssenceDraftFromEpisodeReducer: CaseReducer<
  EssenceSliceState,
  PayloadAction<{ episode_guid: string }>
> = (state, action) => {
  try {
    const episode_guid = action?.payload?.episode_guid ?? '';
    if (!episode_guid) return state;
    const deletedAudioEssenceDrafts = _cloneDeep(
      state.imageEssenceDrafts,
    ) as AudioEssenceDraftsInAnEpisode;
    delete deletedAudioEssenceDrafts[episode_guid];
    return {
      ...state,
      imageEssenceDrafts: deletedAudioEssenceDrafts,
    };
  } catch (e) {
    console.error('removeImageSegmentDraftFromListReducer error:', e);
    return state;
  }
};

const updateEditingAudioSegmentStartTimeReducer: CaseReducer<
  EssenceSliceState,
  PayloadAction<number>
> = (state, action) => ({
  ...state,
  audioEssenceCurrentInputs: {
    ...state.audioEssenceCurrentInputs,
    audio_start_time_num: Number(action.payload),
  },
});

const updateEditingAudioSegmentListPriceReducer: CaseReducer<
  EssenceSliceState,
  PayloadAction<number>
> = (state, action) => ({
  ...state,
  audioEssenceCurrentInputs: {
    ...state.audioEssenceCurrentInputs,
    nft_list_price: action.payload,
  },
});

const updateEditingAudioSegmentQuantityReducer: CaseReducer<
  EssenceSliceState,
  PayloadAction<number>
> = (state, action) => ({
  ...state,
  audioEssenceCurrentInputs: {
    ...state.audioEssenceCurrentInputs,
    nft_edition_quantity: action.payload,
  },
});

const updateEditingAudioSegmentDescriptionReducer: CaseReducer<
  EssenceSliceState,
  PayloadAction<string>
> = (state, action) => ({
  ...state,
  audioEssenceCurrentInputs: {
    ...state.audioEssenceCurrentInputs,
    nft_description: action.payload,
  },
});

const updateEditingAudioSegmentNameReducer: CaseReducer<
  EssenceSliceState,
  PayloadAction<string>
> = (state, action) => ({
  ...state,
  audioEssenceCurrentInputs: {
    ...state.audioEssenceCurrentInputs,
    nft_name: action.payload,
  },
});

const updateEditingAudioSegmentEndTimeReducer: CaseReducer<
  EssenceSliceState,
  PayloadAction<number>
> = (state, action) => ({
  ...state,
  audioEssenceCurrentInputs: {
    ...state.audioEssenceCurrentInputs,
    audio_end_time_num: Number(action.payload),
  },
});

const updateEditingAudioEssenceReducer: CaseReducer<
  EssenceSliceState,
  PayloadAction<NFTPodcastAudioEssenceVo>
> = (state, action) => ({
  ...state,
  audioEssenceCurrentInputs: action.payload,
});

const removeAudioSegmentReducer: CaseReducer<
  EssenceSliceState,
  PayloadAction<number>
> = (state, action) => ({
  ...state,
  // audioSegments: state?.audioSegments?.pop() ?? [],
});

export const essenceSlice = createSlice({
  name: 'essence',
  initialState,
  reducers: {
    addOrUpdateImageEssenceDraftReducer,
    addOrUpdateAudioSegmentDraftToListReducer,
    clearEditingAudioSegmentReducer,
    clearAudioSegmentReducer,
    removeAudioEssenceDraftFromEpisodeReducer,
    removeImageEssenceDraftFromEpisodeReducer,
    updateEditingAudioEssenceReducer,
    updateEditingAudioSegmentListPriceReducer,
    updateEditingAudioSegmentQuantityReducer,
    updateEditingAudioSegmentDescriptionReducer,
    updateEditingAudioSegmentNameReducer,
    updateEditingAudioSegmentStartTimeReducer,
    updateEditingAudioSegmentEndTimeReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => initialState);
  },
});

export const {
  addOrUpdateImageEssenceDraftReducer: addOrUpdateImageEssenceDraftAction,
  addOrUpdateAudioSegmentDraftToListReducer:
    addOrUpdateAudioSegmentDraftToListAction,
  clearEditingAudioSegmentReducer: clearEditingAudioSegmentAction,
  clearAudioSegmentReducer: clearAudioSegmentAction,
  removeAudioEssenceDraftFromEpisodeReducer:
    removeAudioEssenceDraftFromEpisodeAction,
  removeImageEssenceDraftFromEpisodeReducer:
    removeImageEssenceDraftFromEpisodeAction,
  updateEditingAudioEssenceReducer: updateEditingAudioEssenceAction,
  updateEditingAudioSegmentListPriceReducer:
    updateEditingAudioSegmentListPriceAction,
  updateEditingAudioSegmentQuantityReducer:
    updateEditingAudioSegmentQuantityAction,
  updateEditingAudioSegmentDescriptionReducer:
    updateEditingAudioSegmentDescriptionAction,
  updateEditingAudioSegmentNameReducer: updateEditingAudioSegmentNameAction,
  updateEditingAudioSegmentStartTimeReducer:
    updateEditingAudioSegmentStartTimeAction,
  updateEditingAudioSegmentEndTimeReducer:
    updateEditingAudioSegmentEndTimeAction,
} = essenceSlice.actions;

export default essenceSlice.reducer;
