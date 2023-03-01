import * as fcl from '@onflow/fcl';
import { CurrentUserObject, VerifyParams } from '@onflow/fcl';
import { useSelector } from 'react-redux';
import { selectCurrency } from '../../redux/preference/preference.selector';
import { selectCreatorProfile } from '../../redux/creator/creator.selector';
import { useCallback, useEffect, useState } from 'react';
import { fetchTokenBalancesAndUpdateSlice } from '../../services/flow/script/get-flow-balance.script';
import { persistor, useAppDispatch } from '../../redux/store';
import { Wallet } from '../../types/wallet.type';
import { toggleIsShowHamburgerAction } from '../../redux/page/page.slice';
import {
  floatNumToThousandsSeparatorStr,
  thousandsSeparatorStrToNum,
} from '../../utils/currency.utils';
import { selectCollectorProfile } from '../../redux/collector/collector.selector';
import { useQuery } from '@apollo/client';
import { GetPodCasterByWalletAddress } from '../../api/types/user.types';
import { GQL_GET_USER_BY_WALLET_ADDRESS } from '../../api/graphql/user.graphql';
import { initialCreatorState } from '../../redux/creator/creator.slice';

export enum MindtrixUserEnum {
  Collector = 'Collector',
  Creator = 'Creator',
}

type BloctoWalletService = object & {
  data: { f_type: 'Service'; f_vsn: string } & VerifyParams;
  scoped: {
    email: string;
  };
  type: string;
};

export const useSignInOutBlocto = (mindtrixUserEnum: MindtrixUserEnum) => {
  const dispatch = useAppDispatch();
  const { refetch: getUserByWalletAddress } =
    useQuery<GetPodCasterByWalletAddress>(GQL_GET_USER_BY_WALLET_ADDRESS, {
      skip: true,
      errorPolicy: 'all',
      onError: (error) => {
        console.error('getUserByWalletAddress error:', error);
      },
    });
  const isCollector = mindtrixUserEnum === MindtrixUserEnum.Collector;
  const creatorProfile = useSelector(
    isCollector ? selectCollectorProfile : selectCreatorProfile,
  );
  const loggedIn = creatorProfile.wallet.blocto.loggedIn;
  const onClick = useCallback(
    () => ({
      signInOrOut: async (): Promise<boolean> => {
        dispatch(toggleIsShowHamburgerAction());
        if (loggedIn) {
          await persistor.purge();
          fcl.unauthenticate();
          return false;
        } else {
          const authRes =
            (await fcl.authenticate()) as unknown as CurrentUserObject;

          const address = authRes?.addr ?? null;
          const accountProofService = authRes.services.find(
            (services) => services.type === 'account-proof',
          );
          if (accountProofService) {
            // @ts-ignore
            const verified = await fcl.AppUtils.verifyAccountProof(
              'Mindtrix',
              accountProofService.data,
            );
          }
          // login 2 DB
          return !!address;
        }
      },
      signOut: async (): Promise<void> => {
        if (loggedIn) {
          await persistor.purge();
          await fcl.unauthenticate();
        }
      },
      signInOrOutAndGetAddress: async (): Promise<string> => {
        dispatch(toggleIsShowHamburgerAction());
        if (loggedIn) {
          await persistor.purge();
          fcl.unauthenticate();
          return '';
        } else {
          const authRes =
            (await fcl.authenticate()) as unknown as CurrentUserObject;

          const address = authRes?.addr ?? '';
          const accountProofService = authRes.services.find(
            (services) => services.type === 'account-proof',
          );
          if (accountProofService) {
            // @ts-ignore
            const verified = await fcl.AppUtils.verifyAccountProof(
              'Mindtrix',
              accountProofService.data,
            );
          }
          // login 2 DB
          return address;
        }
      },
    }),
    [loggedIn],
  );
  useEffect(() => {
    const initWalletInfo = async () => {
      fcl.currentUser.subscribe(async (bloctoWallet) => {
        const address = bloctoWallet?.addr ?? null;
        const service = bloctoWallet?.services[0] as BloctoWalletService;
        let signedInUser = initialCreatorState.creatorProfile;
        if (address) {
          const mindtrixUser = await getUserByWalletAddress({
            walletAddress: address,
          });
          signedInUser = mindtrixUser?.data?.findUserByWalletAddress ?? null;
        }

        const wallet: Wallet = {
          blocto: {
            address: bloctoWallet?.addr ?? '',
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
            cid: bloctoWallet?.cid ?? '',
            email: service?.scoped?.email ?? '',
            loggedIn: bloctoWallet?.loggedIn ?? false,
          },
        };
        await fetchTokenBalancesAndUpdateSlice(
          address,
          dispatch,
          mindtrixUserEnum,
          wallet,
          signedInUser,
        );
      });
    };
    initWalletInfo();
  }, []);
  return {
    creatorProfile,
    loggedIn,
    onClick,
  };
};

export const useWalletBalance = () => {
  const [flowFlatCurrencyBalance, setFlowFlatCurrencyBalance] = useState('0');
  const currency = useSelector(selectCurrency);
  const displayCurrency = currency.displayCurrency;
  const flowExchange = currency.exchange.flow;
  const creatorProfile = useSelector(selectCreatorProfile);
  const flowBalance = creatorProfile.wallet.blocto.balance.flow.str;

  useEffect(() => {
    if (!flowExchange) return;
    const flatCurrency = flowExchange[displayCurrency];
    const flowFlatCurrencyBalanceTmp = floatNumToThousandsSeparatorStr(
      thousandsSeparatorStrToNum(flowBalance, 8) * flatCurrency,
    );
    setFlowFlatCurrencyBalance(flowFlatCurrencyBalanceTmp);
  }, [
    currency.displayCurrency,
    currency.exchange,
    displayCurrency,
    flowBalance,
    flowExchange,
  ]);

  const flowToFiatCurrency = (flow: number): string => {
    if (isNaN(Number(flow))) return 'null';
    const flatCurrency = flowExchange[displayCurrency];
    return floatNumToThousandsSeparatorStr(
      flow * (flatCurrency ? flatCurrency : 1.8),
    );
  };

  const fiatToFlowCurrency = (fiat: number): string => {
    if (isNaN(Number(fiat))) return 'null';
    const flatCurrency = flowExchange[displayCurrency];
    return floatNumToThousandsSeparatorStr(
      fiat / (flatCurrency ? flatCurrency : 1.8),
    );
  };

  return {
    displayCurrency: displayCurrency.toUpperCase(),
    flowFlatCurrencyBalance,
    flowToFiatCurrency,
    fiatToFlowCurrency,
  };
};
function updateCollectorWalletReducer(wallet: Wallet): any {
  throw new Error('Function not implemented.');
}
