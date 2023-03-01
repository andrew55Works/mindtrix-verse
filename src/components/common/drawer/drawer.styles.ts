import { StyleSheet } from 'react-native';
import theme from '../../../styles/eva-styled-system.json';
import styled from 'styled-components';

export const _styles = (backgroundColor: string, isMobileLayout: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor,
      paddingVertical: 12,
      width: 185,
      flexShrink: 0,
      height: isMobileLayout ? '100%' : 'auto',
    },
    body: {},
    footer: {
      flex: 1,
      justifyContent: 'flex-end',
      height: '60px',
      width: '100%',
    },
    profile: {
      alignItems: 'center',
      display: 'flex',
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    userAvatar: {
      flex: 1,
    },
    userName: {
      color: theme['text-black-color-400'],
      flex: 1,
      fontSize: 16,
      marginHorizontal: 12,
      letterSpacing: 0.2,
      textAlign: 'center',
    },
    buttonPrimary: {
      borderRadius: 0,
      width: '100%',
      marginBottom: 12,
      marginTop: 20,
      marginLeft: 0,
      marginRight: 0,
    },
    buttonSecondary: {
      display: 'flex',
      justifyContent: 'flex-start',
      fontWeight: '300',
      borderWidth: 0,
      borderRadius: 0,
      width: '100%',
      minHeight: 20,
      marginLeft: 0,
      marginRight: 0,
      paddingVertical: 12,
    },
    h6: {
      color: theme['color-primary-700'],
      paddingHorizontal: 12,
      paddingVertical: 12,
    },
  });

export const Hamburger = {
  Container: styled.div`
    z-index: 2;
    position: fixed;
    right: 0;
    top: 63px;
    height: 100%;
  `,
};

export const LeftDrawerImgButton = styled.div`
  height: auto;
  width: auto;
  padding-left: 12px;
  padding-right: 4px;
`;
