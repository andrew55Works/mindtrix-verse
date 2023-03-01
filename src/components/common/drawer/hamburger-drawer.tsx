import React, { FC } from 'react';
import { Hamburger } from './drawer.styles';
import { HamburgerDrawerProps } from './index';
import { selectPageIsShowHamburger } from '../../../redux/page/page.selector';
import { useSelector } from 'react-redux';
import { LeftDrawer } from './left-drawer';

export const HamburgerDrawer: FC<HamburgerDrawerProps> = (props) => {
  const isShowHamburger = useSelector(selectPageIsShowHamburger);

  if (!isShowHamburger) return null;

  return (
    <Hamburger.Container>
      <LeftDrawer {...props} />
    </Hamburger.Container>
  );
};
