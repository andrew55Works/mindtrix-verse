import { ApolloClient } from '@apollo/client';
import { GetSignInNonce } from '../../api/types/user.types';
import { GQL_GET_SIGN_IN_NONCE } from '../../api/graphql/user.graphql';
import { useEffect, useState } from 'react';
import { fclInit, WalletShowEnum } from './fcl.config';

export const useInitFcl = (
  client: ApolloClient<any>,
  walletShowEnum = WalletShowEnum.ALL,
) => {
  const [isInitFCL, setIsInitFCL] = useState(false);
  useEffect(() => {
    const getSignInNonce = async () => {
      const nonceRes = await client.query<GetSignInNonce>({
        query: GQL_GET_SIGN_IN_NONCE,
      });
      const nonce = nonceRes?.data?.getSignInNonce?.nonce ?? null;
      const nonceError = nonceRes?.error ?? null;
      if (nonceError)
        throw new Error('Cannot get sign in nonce. Please try again later!');
      fclInit(nonce, walletShowEnum);
      setIsInitFCL(true);
    };
    getSignInNonce();
  }, []);
  return { isInitFCL };
};
