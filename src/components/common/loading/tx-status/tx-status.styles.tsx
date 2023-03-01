import { AnchorHTMLAttributes, FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { withDefaultPropsStyled } from '../../../../utils/styled-system.utils';
import {
  border,
  color,
  ColorProps,
  shadow,
  space,
  SpaceProps,
  typography,
} from 'styled-system';
import { modalBorder } from '../../../../styles/styled-system/styled-system.config';
import { MotionStyle } from 'framer-motion';
import { Variants } from 'framer-motion/types/types';

export const Container: FC<ColorProps & SpaceProps> = withDefaultPropsStyled(
  styled.article`
    max-width: 300px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    ${space};
    ${color};
    ${border};
    ${shadow};
  `,
  {
    padding: 3,
    boxShadow: 'card',
    ...modalBorder,
  },
);

export const ALink: FC<SpaceProps & AnchorHTMLAttributes<HTMLLinkElement>> =
  withDefaultPropsStyled(
    styled.a`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 300px;
      ${space};
      ${typography};
    `,
    { fontFamily: 'default' },
  );

interface ProgressProps extends HTMLAttributes<HTMLProgressElement> {
  value: number;
}

export const Progress: FC<SpaceProps & ProgressProps> = withDefaultPropsStyled(
  styled.progress`
    width: 100%;
    height: 30px;
    ${space};
  `,
  { marginTop: 2 },
);

export const framer = {
  style: {
    modal: (): MotionStyle => ({
      position: 'fixed',
      left: '1.3%',
      bottom: '1.3%',
      zIndex: 99999,
    }),
  },
  variant: {
    modal: (): Variants => ({
      hidden: {
        left: '-1.3%',
        bottom: '1.3%',
        opacity: 0,
        transition: {
          delay: 0.2,
        },
      },
      visible: {
        opacity: 1,
        position: 'fixed',
        left: '1.3%',
        bottom: '1.3%',
        transition: {
          delay: 0.2,
        },
      },
    }),
  },
};
