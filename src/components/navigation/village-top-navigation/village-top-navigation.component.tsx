import React, { useState } from 'react';
import { ProductTypeEnum } from '../index';
import { useCreatorCommonI18n } from '../../../hooks/i18n/i18n.hooks';
import { useSelector } from 'react-redux';
import {
  selectCreatorProfile,
  selectIsCreatorSignIn,
} from '../../../redux/creator/creator.selector';
import { useIsMobileLayout } from '../../../hooks/window/resize.hooks';
import { CreatorsLogo } from '../creators-logo';
import * as S from './village-top-navigation.styles';
import { selectIsCollectorSignIn } from '../../../redux/collector/collector.selector';
import { useMenuAccountI18n } from '../../../hooks/i18n/i18n-marketplace.hooks';
import { VillageTopNavigationHamburger } from './hamburger.component';
import { SearchContainer } from './search-container';
import { ButtonContainer } from './button-container';
import { LanguageSwitcher } from './language-switer';

export interface Image {
  height: number | undefined;
  url: string | undefined;
  width: number | undefined;
}

export interface Images {
  large: Image;
  medium: Image;
  small: Image;
}

export const imageDefaultState: Image = {
  height: undefined,
  url: undefined,
  width: undefined,
};

export const imagesDefaultState = {
  large: imageDefaultState,
  medium: imageDefaultState,
  small: imageDefaultState,
};

interface TopNavigationProps {
  backgroundColor?: string;
  isBackgroundTransparent?: boolean;
  isShowSearchBar?: boolean;
  pageBackground?: string;
  productTitle: string;
  productType: ProductTypeEnum;
}

export const VillageTopNavigation = ({
  isBackgroundTransparent = false,
  isShowSearchBar = true,
  pageBackground,
}: TopNavigationProps) => {
  const creatorProfile = useSelector(selectCreatorProfile);
  const name = creatorProfile?.name ?? '';
  const avatarUrl = creatorProfile?.images?.small?.url ?? '';
  const [isShowLoginMenu, setIsShowLoginMenu] = useState(false);
  const [isShowHamburger, setIsShowHamburger] = useState(false);
  const { text: textCreatorCommon } = useCreatorCommonI18n();
  const { text } = useMenuAccountI18n();
  const { isMobileLayout } = useIsMobileLayout();
  const isCreatorSignedIn = useSelector(selectIsCreatorSignIn);
  const isCollectorSignedIn = useSelector(selectIsCollectorSignIn);
  const isSignedIn = isCollectorSignedIn || isCreatorSignedIn;

  const onClick = {
    showLogin: () => setIsShowLoginMenu(true),
    dismissLoginMenu: () => setIsShowLoginMenu(false),
  };

  const stickyNavigation = () => (
    <S.NavigationContainer>
      <div>
        <CreatorsLogo isWhiteStyle={isBackgroundTransparent} />
      </div>
      <SearchContainer
        isMobileLayout={isMobileLayout}
        isShow={isShowSearchBar}
      />
      <LanguageSwitcher isHide={isMobileLayout} />
      <ButtonContainer
        isSignedIn={isSignedIn}
        isMobileLayout={isMobileLayout}
        isWhiteStyle={isBackgroundTransparent}
        setIsShowHamburger={setIsShowHamburger}
      />
      <VillageTopNavigationHamburger
        isWhiteStyle={isBackgroundTransparent}
        isShow={isShowHamburger}
        pageBackground={pageBackground}
      />
    </S.NavigationContainer>
  );

  return (
    <S.StickyContainer isBackgroundTransparent={isBackgroundTransparent}>
      {stickyNavigation()}
    </S.StickyContainer>
  );
};
