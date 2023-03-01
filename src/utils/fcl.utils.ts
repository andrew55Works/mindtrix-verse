import { GetSignInNonce } from '../api/types/user.types';
import { GQL_GET_SIGN_IN_NONCE } from '../api/graphql/user.graphql';
import apolloClient from '../api/apollo/apollo-client';
import { fclInit, WalletShowEnum } from '../hooks/fcl/fcl.config';

export const fclInitByWalletShowEnum = async (
  walletShowEnum: WalletShowEnum,
) => {
  const nonceRes = await apolloClient.query<GetSignInNonce>({
    query: GQL_GET_SIGN_IN_NONCE,
  });
  const nonce = nonceRes?.data?.getSignInNonce?.nonce ?? null;
  const nonceError = nonceRes?.error ?? null;
  if (nonceError)
    throw new Error('Cannot get sign in nonce. Please try again later!');
  fclInit(nonce, walletShowEnum);
};
