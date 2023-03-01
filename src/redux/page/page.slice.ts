import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageLoadingQueue } from './page.interface';
import { PURGE } from 'redux-persist';

export interface PageSliceState {
  page: {
    isShowHamburger: boolean;
    loadingQueue: PageLoadingQueue;
  };
}

const initialState: PageSliceState = {
  page: {
    isShowHamburger: false,
    loadingQueue: [],
  },
};

const addPageLoadingQueueReducer: CaseReducer<
  PageSliceState,
  PayloadAction<string>
> = (state, action) => {
  const loadingEvent = action?.payload ?? null;
  if (!loadingEvent) return state;
  const prevLoadingQueue = [...state.page.loadingQueue];
  prevLoadingQueue.push(loadingEvent);
  return {
    ...state,
    page: {
      ...state.page,
      loadingQueue: prevLoadingQueue,
    },
  };
};

const removePageLoadingQueueReducer: CaseReducer<
  PageSliceState,
  PayloadAction<string>
> = (state, action) => {
  const loadingEvent = action?.payload ?? null;
  if (!loadingEvent) return state;
  const prevLoadingQueue = [...state.page.loadingQueue].filter(
    (key) => key !== loadingEvent,
  );
  return {
    ...state,
    page: {
      ...state.page,
      loadingQueue: prevLoadingQueue,
    },
  };
};

const toggleIsShowHamburgerReducer: CaseReducer<
  PageSliceState,
  PayloadAction<boolean | undefined>
> = (state, action) => {
  const isShowHamburger =
    action?.payload ?? !(state?.page?.isShowHamburger ?? true);
  return {
    ...state,
    page: {
      ...state.page,
      isShowHamburger,
    },
  };
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    addPageLoadingQueueReducer,
    toggleIsShowHamburgerReducer,
    removePageLoadingQueueReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.page = initialState.page;
    });
  },
});

export const {
  addPageLoadingQueueReducer: addPageLoadingQueueAction,
  toggleIsShowHamburgerReducer: toggleIsShowHamburgerAction,
  removePageLoadingQueueReducer: removePageLoadingQueueAction,
} = pageSlice.actions;

export default pageSlice.reducer;
