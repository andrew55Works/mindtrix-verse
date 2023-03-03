import React, { useEffect, useRef } from 'react';
import { CreatorProfile } from '../../redux/creator/creator.interface';
import { initialCreatorState } from '../../redux/creator/creator.slice';
import { ChildAccountInfo } from '../../types/creator.type';
import { fetchTokenBalancesAndUpdateSlice } from '../../services/flow/script/get-flow-balance.script';
import { MindtrixUserEnum } from '../wallet/wallet.hooks';
import { AppDispatch } from '../../redux/store';
import { useQuery } from '@apollo/client';
import { GetChildAccountByEmailRes } from '../../api/types/user.types';
import { GQL_FIND_CHILD_ACCOUNT_BY_EMAIL } from '../../api/graphql/user.graphql';
import { getDefaultChildAccountWallet } from '../../utils/wallet.utils';

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
  const isFetchFirstTime = useRef(false);

  useEffect(() => {
    const getChildAccountAndUpdateState = async () => {
      if (setIsShowLoadingLogo) setIsShowLoadingLogo(true);
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
      const wallet = getDefaultChildAccountWallet(
        childAccountAddress,
        googleEmail,
      );
      await fetchTokenBalancesAndUpdateSlice(
        childAccountAddress,
        dispatch,
        MindtrixUserEnum.Collector,
        wallet,
        userVo,
      );
    };
    // immediately fetch for the first time
    if (!isFetchFirstTime.current && (childAccountInfo?.email ?? '')) {
      getChildAccountAndUpdateState();
      isFetchFirstTime.current = true;
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
