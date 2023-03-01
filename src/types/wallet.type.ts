export interface BalanceFormat {
  num: number;
  str: string;
}

export interface Balance {
  flow: BalanceFormat;
  fusd: BalanceFormat;
  usdc: BalanceFormat;
}

export interface Blocto {
  address: string;
  balance: Balance;
  cid: string;
  email: string;
  loggedIn: boolean;
}

export interface Wallet {
  blocto: Blocto;
}

export const initialWallet: Wallet = {
  blocto: {
    address: '',
    balance: {
      flow: {
        num: 0,
        str: '0',
      },
      fusd: {
        num: 0,
        str: '0',
      },
      usdc: {
        num: 0,
        str: '0',
      },
    },
    cid: '',
    email: '',
    loggedIn: false,
  },
};

export interface BloctoWallet {
  addr: string;
  cid: string;
  ft: {
    flowNum: number;
    flowStr: string;
  };
  loggedIn: boolean;
  services: [{ scoped: { email: string } }];
}
