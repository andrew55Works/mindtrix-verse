import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { _cloneDeep } from '../../utils/lodash.utils';
import {
  BreadcrumbJsonLdState,
  breadcrumbJsonLdStateDefault,
  BreadcrumbListItemJsonLd,
} from './breadcrumb.interface';

export interface BreadcrumbSliceState {
  breadcrumbJsonLd: BreadcrumbJsonLdState;
}
const initialState: BreadcrumbSliceState = {
  breadcrumbJsonLd: breadcrumbJsonLdStateDefault(),
};

const updateLevelsBreadcrumbReducer: CaseReducer<
  BreadcrumbSliceState,
  PayloadAction<Array<BreadcrumbListItemJsonLd>>
> = (state, action) => {
  const breadcrumbs = action?.payload ?? breadcrumbJsonLdStateDefault();
  const orgPositionObj = _cloneDeep(state.breadcrumbJsonLd.positionObj) as {
    [position: string]: BreadcrumbListItemJsonLd;
  };
  breadcrumbs?.forEach((item) => {
    const itemPosition = item?.position ?? -1;
    const isKeyExistInBreadcrumbs = itemPosition in orgPositionObj;
    if (isKeyExistInBreadcrumbs) {
      orgPositionObj[itemPosition] = item;
    }
  });

  return {
    ...state,
    breadcrumbJsonLd: {
      ...state.breadcrumbJsonLd,
      positionObj: orgPositionObj,
    },
  };
};

const clearAudioSegmentReducer: CaseReducer<BreadcrumbSliceState> = (state) =>
  initialState;

export const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState,
  reducers: {
    clearAudioSegmentReducer,
    updateLevelsBreadcrumbReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => initialState);
  },
});

export const {
  clearAudioSegmentReducer: clearAudioSegmentAction,
  updateLevelsBreadcrumbReducer: updateLevelsBreadcrumbAction,
} = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
