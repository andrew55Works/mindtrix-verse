import styled from 'styled-components';
import React, { AnchorHTMLAttributes, HTMLAttributes } from 'react';
import {
  borders,
  BordersProps,
  color as colorFn,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  variant,
} from 'styled-system';
import { statusColorSystemStr } from './color.theme';

interface ComponentProps extends AnchorHTMLAttributes<HTMLLinkElement> {
  status: 'basic' | 'primary' | 'secondary' | 'success' | 'info' | 'danger';
}
type StyleSystemProps = ColorProps &
  BordersProps &
  FlexboxProps &
  LayoutProps &
  PositionProps &
  SpaceProps &
  ShadowProps;
const styleSystemBase: StyleSystemProps = {
  backgroundColor: statusColorSystemStr.white,
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: 'rgb(243, 246, 250)',
  borderRadius: '1',
  boxShadow: 'card',
  padding: '6',
  marginTop: '5',
  marginBottom: '5',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
};

const getVariantBasicStyle = () => ({
  ...styleSystemBase,
});

const getVariant = () =>
  variant({
    prop: 'status',
    variants: {
      basic: getVariantBasicStyle(),
    },
  });

interface IStyleProps {
  component: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}
const getStyled = ({ component }: IStyleProps) =>
  styled(component)<ComponentProps & StyleSystemProps>`
    appearance: none;
    ${getVariant()};
    ${borders};
    ${colorFn};
    ${flexbox}
    ${position};
    ${layout};
    ${space};
    ${shadow};
  `;

export const Card = {
  article: getStyled({ component: 'article' }),
  a: getStyled({ component: 'a' }),
};
