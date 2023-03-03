import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root.reducer';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { coinGeckoApi } from '../api/restful/coingecko.query';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';

import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
} from 'redux-state-sync';

const isProductionEnv = process.env.NODE_ENV === 'production';
const loggerMiddle = isProductionEnv ? [] : [logger];

const isServer = typeof window === 'undefined';

let store;
if (isServer) {
  store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {},
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(...loggerMiddle, coinGeckoApi.middleware),
  });
} else {
  const stateSyncMiddleware = createStateSyncMiddleware({
    whitelist: ['creator-signup/updateCreatorSignupEmailVerificationReducer'],
    // blacklist: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE'],
  });
  store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {},
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(
        ...loggerMiddle,
        coinGeckoApi.middleware,
        stateSyncMiddleware,
      ),
  });
}

initStateWithPrevTab(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

export const persistor = persistStore(store);
