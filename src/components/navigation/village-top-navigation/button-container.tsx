import Hamburger from 'hamburger-react';
import * as S from './village-top-navigation.styles';
import LoginMenuContainer from '../village-login-menu/login-menu.container';
import React, { FC } from 'react';
import { Button } from '../../../styles/styled-system/button.theme';
import OtterSVG from '../../../assets/svg/icon_otter.svg';
import {
  colors,
  statusColorSystemStr,
} from '../../../styles/styled-system/color.theme';
import { useMenuAccountI18n } from '../../../hooks/i18n/i18n-marketplace.hooks';

interface Props {
  isMobileLayout: boolean;
  isSignedIn: boolean;
  isWhiteStyle: boolean;
  setIsShowHamburger: React.Dispatch<boolean>;
}
export const ButtonContainer: FC<Props> = ({
  isMobileLayout,
  isSignedIn,
  isWhiteStyle,
  setIsShowHamburger,
}) => {
  const { text } = useMenuAccountI18n();
  const onToggle = (toggled: boolean): void => {
    // @ts-ignore
    setIsShowHamburger((prev: boolean) => !prev);
  };

  const SignedInButton = (
    <Button.Square
      status={'basic'}
      appearance={'filled'}
      size={'medium'}
      children={text.label_account}
      LeftImage={<OtterSVG />}
      color={statusColorSystemStr.basic}
      backgroundColor={colors.basic[1]}
      width={196}
      paddingTop={'8px'}
      marginRight={0}
      paddingBottom={'8px'}
      borderWidth={'2px'}
      borderColor={colors.basic[8]}
      borderStyle={'solid'}
    />
  );

  const UnSignedInButton = (
    <Button.Square
      status={'primary'}
      size={'medium'}
      appearance={'filled'}
      children={text.button_wallet}
      minWidth={88}
      fontWeight={700}
      marginRight={0}
      fontSize={5}
      paddingTop={'8px'}
      paddingBottom={'8px'}
    />
  );

  return (
    <S.RWDMenuButtonContainer>
      {isMobileLayout ? (
        <Hamburger
          onToggle={onToggle}
          color={isWhiteStyle ? '#ffffff' : '#000000'}
        />
      ) : (
        <S.MenuButtonContainer>
          {isSignedIn ? SignedInButton : UnSignedInButton}
          <LoginMenuContainer />
        </S.MenuButtonContainer>
      )}
    </S.RWDMenuButtonContainer>
  );
};
