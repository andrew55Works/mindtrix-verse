import { createSelector } from 'reselect';
import { RootState } from '../root.reducer';

const selectedState = (state: RootState) =>
  state.encryptedSessionStorage.pageSlice;

export const selectPageIsLoading = createSelector(
  [selectedState],
  (pageSlice) => {
    const loadingQueue = pageSlice?.page?.loadingQueue ?? [];
    return !!loadingQueue && (loadingQueue?.length ?? 0) > 0;
  },
);
export const selectPageIsShowHamburger = createSelector(
  [selectedState],
  (pageSlice) => {
    return pageSlice?.page?.isShowHamburger ?? false;
  },
);
