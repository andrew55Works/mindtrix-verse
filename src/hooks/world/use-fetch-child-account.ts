import React, { useEffect } from 'react';
import { CreatorProfile } from '../../redux/creator/creator.interface';
import { initialCreatorState } from '../../redux/creator/creator.slice';
import { ChildAccountInfo } from '../../types/creator.type';
import { Wallet } from '../../types/wallet.type';
import { fetchTokenBalancesAndUpdateSlice } from '../../services/flow/script/get-flow-balance.script';
import { MindtrixUserEnum } from '../wallet/wallet.hooks';
import { AppDispatch } from '../../redux/store';
import { useQuery } from '@apollo/client';
import { GetChildAccountByEmailRes } from '../../api/types/user.types';
import { GQL_FIND_CHILD_ACCOUNT_BY_EMAIL } from '../../api/graphql/user.graphql';

export const useFetchChildAccount = (
  childAccountInfo: ChildAccountInfo,
  dispatch: AppDispatch,
  setChildAccountInfo: React.Dispatch<ChildAccountInfo> | undefined,
  setIsShowLoadingLogo: React.Dispatch<boolean> | undefined,
) => {
  const { refetch: getChildAccountByEmail } =
    useQuery<GetChildAccountByEmailRes>(GQL_FIND_CHILD_ACCOUNT_BY_EMAIL, {
      skip: true,
    });

  useEffect(() => {
    const getChildAccountAndUpdateState = async () => {
      const googleEmail = childAccountInfo?.email ?? '';
      const childAccountRes = await getChildAccountByEmail({
        email: googleEmail,
      });
      const userVo: CreatorProfile =
        childAccountRes?.data?.findChildAccountByEmail ??
        initialCreatorState.creatorProfile;
      const childAccountAddress = userVo?.child_wallet_account?.address ?? '';
      const childAccountEmail = userVo?.email ?? '';
      const isExist = !!childAccountAddress;
      if (!isExist) return;
      const childAccountInfoTmp: ChildAccountInfo = childAccountInfo;
      childAccountInfoTmp._id = userVo?._id ?? '';
      childAccountInfoTmp.email = childAccountEmail;
      childAccountInfoTmp.child_wallet_account = userVo?.child_wallet_account;
      childAccountInfoTmp.isCreatingChildAccount = false;
      if (setChildAccountInfo && setIsShowLoadingLogo) {
        setChildAccountInfo(childAccountInfoTmp);
        setIsShowLoadingLogo(false);
      }

      const wallet: Wallet = {
        blocto: {
          address: childAccountAddress,
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
          email: googleEmail,
          loggedIn: true,
        },
      };
      await fetchTokenBalancesAndUpdateSlice(
        childAccountAddress,
        dispatch,
        MindtrixUserEnum.Collector,
        wallet,
        userVo,
      );
    };
    const isNeedRefetchChildAccount =
      childAccountInfo?.isCreatingChildAccount ?? false;
    if (isNeedRefetchChildAccount && setIsShowLoadingLogo) {
      setIsShowLoadingLogo(true);
    }
    const timer = setInterval(() => {
      const isNeedRefetchChildAccountInner =
        childAccountInfo?.isCreatingChildAccount ?? false;
      if (!isNeedRefetchChildAccountInner) return;
      getChildAccountAndUpdateState();
    }, 3000);
    return () => clearInterval(timer);
  }, [childAccountInfo]);
};
