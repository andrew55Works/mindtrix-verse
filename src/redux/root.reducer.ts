import { combineReducers } from '@reduxjs/toolkit';
import essenceSlice, { EssenceSliceState } from './essence/essence.slice';
import breadcrumbSlice, {
  BreadcrumbSliceState,
} from './breadcrumb/breadcrumb.slice';
import creatorSlice, {
  CreatorProfileSliceState,
} from './creator/creator.slice';
import collectorSlice, {
  CollectorProfileSliceState,
} from './collector/collector.slice';
import { panGuApi } from '../api/restful/pangu.query';
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { coinGeckoApi } from '../api/restful/coingecko.query';
import preferenceSlice, {
  PreferenceSliceState,
} from './preference/preference.slice';
import pageSlice, { PageSliceState } from './page/page.slice';
import creatorSignupSlice, {
  CreatorSignupProfileSliceState,
} from './creator-signup/creator-signup.slice';
import currencySlice, { CurrencySliceState } from './currency/currency.slice';

export const STORAGE_KEY = {
  encryptedLocalStorageRoot: 'encryptedLocalStorageRoot',
  encryptedSessionStorageRoot: 'encryptedSessionStorageRoot',
  sessionStorageRoot: 'sessionStorageRoot',
};

interface SessionStorageState {
  breadcrumbSlice: BreadcrumbSliceState;
  collectorSlice: CollectorProfileSliceState;
  creatorSlice: CreatorProfileSliceState;
  currencySlice: CurrencySliceState;
  essenceSlice: EssenceSliceState;
  pageSlice: PageSliceState;
  preferenceSlice: PreferenceSliceState;
}

interface LocalStorageState {
  creatorSignupSlice: CreatorSignupProfileSliceState;
}

const persistConfig = {
  sessionStorage: (): PersistConfig<SessionStorageState> => ({
    key: STORAGE_KEY.sessionStorageRoot,
    storage: sessionStorage,
  }),
  encryptedLocalStorage: (): PersistConfig<LocalStorageState> => ({
    key: STORAGE_KEY.encryptedLocalStorageRoot,
    storage,
    transforms: [
      encryptTransform({
        onError: (error) => {
          console.error('encryptedLocalStorage encrypt error:', error);
        },
        secretKey: 'my-super-secret-key',
      }),
    ],
  }),
  encryptedSessionStorage: (): PersistConfig<SessionStorageState> => ({
    key: STORAGE_KEY.encryptedSessionStorageRoot,
    storage: sessionStorage,
    transforms: [
      encryptTransform({
        onError: (error) => {
          console.error('encryptedSessionStorage error:', error);
        },
        secretKey: 'my-super-secret-key',
      }),
    ],
  }),
};

const storageReducer = {
  encryptSessionStorageReducer: persistReducer(
    persistConfig.encryptedSessionStorage(),
    combineReducers({
      breadcrumbSlice,
      collectorSlice,
      creatorSlice,
      currencySlice,
      essenceSlice,
      pageSlice,
      preferenceSlice,
    }),
  ),
  encryptedLocalStorage: persistReducer(
    persistConfig.encryptedLocalStorage(),
    combineReducers({
      creatorSignupSlice,
    }),
  ),
};

const rootReducer = combineReducers({
  encryptedLocalStorage: storageReducer.encryptedLocalStorage,
  encryptedSessionStorage: storageReducer.encryptSessionStorageReducer,
  [panGuApi.reducerPath]: panGuApi.reducer,
  [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
