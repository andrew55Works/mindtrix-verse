import { Wallet } from '../types/wallet.type';

export const getDefaultChildAccountWallet = (
  address: string,
  email: string,
): Wallet => {
  return {
    blocto: {
      address,
      balance: {
        flow: {
          num: 0,
          str: '0',
        },
        usdc: {
          num: 0,
          str: '0',
        },
        fusd: {
          num: 0,
          str: '0',
        },
      },
      cid: '',
      email,
      loggedIn: true,
    },
  };
};
