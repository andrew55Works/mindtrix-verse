import { formattedCurrency } from '../../../utils/currency.utils';
import { initialWallet, Wallet } from '../../../types/wallet.type';
import { updateCreatorProfileAction } from '../../../redux/creator/creator.slice';
import { updateCollectorProfileAction } from '../../../redux/collector/collector.slice';
import { MindtrixUserEnum } from '../../../hooks/wallet/wallet.hooks';
import { AppDispatch } from '../../../redux/store';
import { CreatorProfile } from '../../../redux/creator/creator.interface';
import { CollectorProfile } from '../../../redux/collector/collector.interface';
import { getBalanceByAddress } from '../../../api/fcl/scripts.fcl';
import {
  getStableCoinIdentifiers,
  getVolatileCoinIdentifiers,
} from '../../../utils/token.utils';
import { BalanceDicRes } from '../../../types/on-chain.type';
import { _get } from '../../../utils/lodash.utils';

export const fetchTokenBalancesAndUpdateSlice = async (
  address: string | null,
  dispatch: AppDispatch,
  targetedUpdateUserSlice: MindtrixUserEnum,
  orgWallet: Wallet | null,
  signedInUser: Omit<CreatorProfile, 'revenue' | 'shows'> | CollectorProfile,
) => {
  const coins = {
    ...getStableCoinIdentifiers(),
    ...getVolatileCoinIdentifiers(),
  };
  let balance = {
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
  };

  if (address === null) return Promise.resolve(balance);
  const [balanceRes, balanceError] = await getBalanceByAddress(address);
  if (balanceError) {
    console.error('fetchTokenBalance Error:', balanceError);
    return balance;
  }
  const data: BalanceDicRes = balanceRes?.data ?? {};
  const fusdFloat = Number.parseFloat(_get(data, [coins.fusd], 0.0));
  const usdcFloat = Number.parseFloat(_get(data, [coins.usdc], 0.0));
  const flowFloat = Number.parseFloat(_get(data, [coins.flow], 0.0));
  balance = {
    flow: {
      num: flowFloat,
      str: formattedCurrency(flowFloat?.toFixed(2)?.toString()),
    },
    fusd: {
      num: fusdFloat,
      str: formattedCurrency(fusdFloat?.toFixed(2)?.toString()),
    },
    usdc: {
      num: usdcFloat,
      str: formattedCurrency(usdcFloat?.toFixed(2)?.toString()),
    },
  };

  const newWallet: Wallet = {
    ...orgWallet,
    blocto: {
      ...(orgWallet?.blocto ?? initialWallet.blocto),
      balance,
    },
  };

  if (targetedUpdateUserSlice === MindtrixUserEnum.Creator) {
    const newProfile: CreatorProfile = {
      ...(signedInUser as CreatorProfile),
      wallet: newWallet,
    };
    dispatch(updateCreatorProfileAction(newProfile));
  } else {
    const newProfile: CollectorProfile = {
      ...signedInUser,
      wallet: newWallet,
    };
    dispatch(updateCollectorProfileAction(newProfile));
  }
};
