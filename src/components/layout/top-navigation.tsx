import { default as React, FC } from 'react';
import { StyleSheet } from 'react-native';
import { ProductTypeEnum } from '../navigation/index';
import theme from '../../styles/eva-styled-system.json';
import { TopNavigation } from '../navigation/top-navigation.component';
import { VillageTopNavigation } from '../navigation/village-top-navigation/village-top-navigation.component';
import styled from 'styled-components';
import * as S from '../navigation/top-navigation.styles';

const styles = StyleSheet.create({
  container: {
    minHeight: '100vh',
  },
  scrollView: {
    backgroundColor: theme['text-secondary-color'],
    width: '100%',
  },
});

const NavContainer = styled.div<{
  isBackgroundTransparent?: boolean;
  isShowNav?: boolean;
}>`
  position: ${(props) =>
    props.isBackgroundTransparent ? 'inherit' : 'sticky'};
  height: 80px;
  top: -16px;
  left: 0;
  right: 0;
  z-index: 1;
  opacity: ${(props) => (props?.isShowNav ?? true ? 1 : 0)};
  &::after {
    content: '';
    display: block;
    height: 16px;
    /* make pseudo elements sticky as well */
    position: sticky;
    background: ${(props) =>
      props.isBackgroundTransparent
        ? 'transparent'
        : 'linear-gradient(white 10%,rgba(255, 255, 255, 0.8) 50%,rgba(255, 255, 255, 0.4) 70%,transparent);'}
    top: 0;
    /* cover should fall over shadow */
    z-index: 2;
  }
  &::before {
    content: '';
    display: block;
    height: 16px;
    top: 48px; // 48+16=64
    /* make pseudo elements sticky as well */
    position: sticky;
    box-shadow:  ${(props) =>
      props.isBackgroundTransparent
        ? 'none'
        : '2px 2px 2px 0.5px rgb(0 0 0 / 30%)'};
  }
  //&:hover::after {
  //  opacity: 1;
  //}
`;

interface Props {
  isAbsolutePosition?: boolean;
  isShowNav?: boolean;
  isShowPadding?: boolean;
  isShowSearchBar?: boolean;
  pageBackground?: string;
  pageBackgroundImageUrl?: string;
  productType: ProductTypeEnum;
}
export const TopNavigationLayout: FC<Props> = ({
  children,
  isAbsolutePosition = false,
  isShowNav = true,
  isShowPadding = true,
  isShowSearchBar = true,
  pageBackground,
  pageBackgroundImageUrl,
  productType = ProductTypeEnum.Collector,
}) => {
  const isBackgroundTransparent = !!pageBackground;
  const NavTop = () => {
    switch (productType) {
      case ProductTypeEnum.Village: {
        return (
          <NavContainer
            isBackgroundTransparent={isBackgroundTransparent}
            isShowNav={isShowNav}
          >
            <VillageTopNavigation
              isBackgroundTransparent={isBackgroundTransparent}
              pageBackground={pageBackground}
              isShowSearchBar={isShowSearchBar}
              productTitle={'Mindtrix'}
              productType={productType}
            />
          </NavContainer>
        );
      }
      default: {
        return (
          <TopNavigation productTitle={'Mindtrix'} productType={productType} />
        );
      }
    }
  };
  return (
    <S.TopNavigationContainer
      isAbsolutePosition={isAbsolutePosition}
      pageBackground={pageBackground}
      pageBackgroundImageUrl={pageBackgroundImageUrl}
    >
      {NavTop()}
      <S.MainContainer isShowPadding={isShowPadding}>
        {children}
      </S.MainContainer>
    </S.TopNavigationContainer>
  );
};
