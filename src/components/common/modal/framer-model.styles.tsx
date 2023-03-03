import { MotionStyle } from 'framer-motion';
import styled from 'styled-components';
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from 'styled-system';
import React, { FC, HTMLAttributes } from 'react';
import { Text } from '../../../styles/styled-system/text.theme';
import CrossSvg from '../../../assets/svg/icon_cross_close_small.svg';
import { useKeyPress } from '../../../hooks/key-press/key-press.hooks';

export const _style = {
  backgroundCover: (): MotionStyle => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,.5)',
    zIndex: 1,
  }),
  modal: (
    padding: string,
    maxHeight = '66%',
    maxWidth = '100vw',
  ): MotionStyle => ({
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth,
    maxHeight,
    overflowY: 'auto',
    width: 'fit-content',
    margin: '0 auto',
    padding,
    boxShadow: '4px 4px 5px rgba(0, 0, 0, 0.25)',
    background: 'white',
    borderRadius: '10px',
    textAlign: 'center',
  }),
};
export const framerVariants = {
  backgroundCover: {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  },
  modal: {
    hidden: {
      y: '-60%',
      x: '-50%',
      top: '50%',
      left: '50%',
      opacity: 0,
    },
    visible: {
      y: '-50%',
      x: '-50%',
      opacity: 1,
      top: '50%',
      left: '50%',
      transition: {
        delay: 0.2,
      },
    },
  },
};

const HeaderContainer = styled.div<
  ColorProps & FlexboxProps & LayoutProps & SpaceProps
>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  ${color};
  ${flexbox};
  ${layout};
  ${space};
`;

const Header: FC<{ text: string } & FlexboxProps> = ({
  text,
  justifyContent = 'flex-start',
}) =>
  text ? (
    <HeaderContainer justifyContent={justifyContent}>
      <Text.h2
        status={'basic'}
        isAutoWrap={true}
        marginTop={0}
        marginBottom={0}
        py={2}
        px={4}
      >
        {text}
      </Text.h2>
    </HeaderContainer>
  ) : null;

const Body = styled.div<ColorProps & FlexboxProps & LayoutProps & SpaceProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-break: break-word;
  ${color};
  ${flexbox};
  ${layout};
  ${space};
`;

const Footer = styled.div<ColorProps & FlexboxProps & LayoutProps & SpaceProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  ${color};
  ${flexbox};
  ${layout};
  ${space};
`;

const ButtonContainer = styled.button<
  ColorProps & LayoutProps & SpaceProps & HTMLAttributes<HTMLButtonElement>
>`
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 4px;
  &:hover {
    background: #f1f1f1;
  }
  ${color};
  ${layout};
  ${space};
`;

export const ModalFooterButton: FC<
  { text: string } & HTMLAttributes<HTMLButtonElement>
> = ({ text, onClick, ...props }) => {
  const isShow = !!onClick;
  if (!isShow) return null;
  return (
    <ButtonContainer onClick={onClick} {...props}>
      <Text.h3 status={'secondary'} mx={2} py={2} my={0}>
        {text}
      </Text.h3>
    </ButtonContainer>
  );
};

const HeaderDismissCrossButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 16px;
  border-radius: 4px;
  margin: 6px;
  &:hover {
    background: #f1f1f1;
  }
`;

const HeaderDismissCrossButtonContainer: FC<{
  isShow: boolean;
  onClick: () => void;
}> = ({ isShow, onClick }) => {
  const exit = useKeyPress('Escape');
  if (!isShow) return null;
  if (exit) onClick();
  return (
    <HeaderDismissCrossButton onClick={onClick}>
      <CrossSvg width={10} height={10} />
    </HeaderDismissCrossButton>
  );
};

export const Modal = {
  Header,
  Body,
  Footer,
  Button: {
    Footer: ModalFooterButton,
    HeaderCross: HeaderDismissCrossButtonContainer,
  },
};
