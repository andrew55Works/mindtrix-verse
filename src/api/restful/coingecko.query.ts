import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import * as I from '../types/coingecko.types';
import { objectToQueryStr } from '../../utils/api.utils';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.coingecko.com/api/v3/',
});
export const coinGeckoApi = createApi({
  reducerPath: 'coinGeckoApi',
  baseQuery,
  endpoints: (builder) => ({
    getFlowTwdPrice: builder.query<I.GetFlowTwdPriceRes, boolean>({
      query: (localization: boolean) => {
        const querystring = objectToQueryStr({
          localization: true,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false,
        });
        return {
          url: `coins/flow?${querystring}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetFlowTwdPriceQuery } = coinGeckoApi;
