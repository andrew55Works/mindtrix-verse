import styled from 'styled-components';
import { colors } from '../../../styles/styled-system/color.theme';

export const StickyContainer = styled.div<{ isBackgroundTransparent: boolean }>`
  background: ${(props) =>
    props.isBackgroundTransparent ? 'transparent' : colors.basic[0]};
  width: 100%;
  height: 54px;
  display: flex;
  justify-content: center;
  position: sticky;
  padding: 5px 0;
  top: 0;
  margin-top: -16px;
  z-index: 3;
`;

export const NavigationContainer = styled.div`
  display: flex;
  max-width: 1276px;
  margin-left: 24px;
  margin-right: 24px;
  width: 100%;
  align-self: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 44px;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex: 1;
  margin-left: 10px;
  margin-right: 15px;
  justify-content: center;
  align-items: center;
`;

export const RWDMenuButtonContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
`;

export const MenuButtonContainer = styled.div`
  &:hover .menu-content {
    display: flex;
  }
`;
