import React, { useEffect } from 'react';
import { DrawerProps } from './index';
import { useRouter } from 'next/router';
import { PAGE_URL } from '../../../utils/page-router.utils';
import { useAppDispatch } from '../../../redux/store';
import { useIsMobileLayout } from '../../../hooks/window/resize.hooks';
import { HamburgerDrawer } from './hamburger-drawer';
import { LeftDrawer } from './left-drawer';
import { ProductTypeEnum } from '../../navigation';
import { toggleIsShowHamburgerAction } from '../../../redux/page/page.slice';
import { useSelector } from 'react-redux';
import { selectIsWalletConnected } from '../../../redux/creator/creator.selector';

export const LeftDrawerRWDContainer = (props: DrawerProps) => {
  const dispatch = useAppDispatch();
  const nextRouter = useRouter();
  const loggedIn = useSelector(selectIsWalletConnected);
  const { isMobileLayout } = useIsMobileLayout();
  const productTitle = 'Mindtrix';
  const productType = props?.productType ?? ProductTypeEnum.Collector;
  const onClick = () => {
    return { signInOrOut: () => nextRouter.push(PAGE_URL.creators_logout) };
  };
  useEffect(() => {
    if (!loggedIn) {
      nextRouter.push(PAGE_URL.creators_login);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (!isMobileLayout) {
      dispatch(toggleIsShowHamburgerAction(false));
    }
  }, [isMobileLayout]);

  return isMobileLayout ? (
    <HamburgerDrawer
      onClick={onClick}
      productTitle={productTitle}
      productType={productType}
    />
  ) : (
    <LeftDrawer
      onClick={onClick}
      productTitle={productTitle}
      productType={productType}
    />
  );
};
