import styled from 'styled-components';
import {
  color as colorFn,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
  variant,
} from 'styled-system';
import * as React from 'react';
import { statusColorSystemStr } from './color.theme';
import {
  getCursor,
  getTextDecoration,
  getTextEllipsisCss,
  ICommonTextProps,
} from '../../components/common/text/text.styles';
import { DOMAttributes, HTMLAttributes } from 'react';

interface ComponentProps
  extends Pick<ICommonTextProps, 'maxTextLine' | 'isAutoWrap'> {
  mixBlendMode?: string;
  status: 'basic' | 'primary' | 'secondary' | 'success' | 'info' | 'danger';
}
type StyleSystemProps = ColorProps & TypographyProps & SpaceProps;
const styleSystemBase: StyleSystemProps = {
  color: statusColorSystemStr.basic,
  fontFamily: 'default',
  lineHeight: 'default',
  letterSpacing: 'default',
};

interface IVariantProps {
  color?: string;
  fontSize: string | number;
  fontWeight: string | number;
  isShow?: boolean;
  marginVertical?: string | number;
}

const getVariantBasicStyle = ({
  color,
  fontSize,
  fontWeight,
  marginVertical = 0,
}: IVariantProps) => ({
  ...styleSystemBase,
  color,
  fontSize,
  fontWeight,
  marginTop: marginVertical,
  marginBottom: marginVertical,
});

const variedStyle = {
  basic: {
    color: statusColorSystemStr.basic,
  },
  primary: {
    color: statusColorSystemStr.primary,
  },
  secondary: {
    color: statusColorSystemStr.secondary,
  },
  danger: {
    color: statusColorSystemStr.danger,
  },
};

const getVariant = (variantProps: IVariantProps) =>
  variant({
    prop: 'status',
    variants: {
      basic: getVariantBasicStyle({
        ...variantProps,
        ...variedStyle.basic,
      }),
      primary: getVariantBasicStyle({
        ...variantProps,
        ...variedStyle.primary,
      }),
      secondary: getVariantBasicStyle({
        ...variantProps,
        ...variedStyle.secondary,
      }),
      danger: getVariantBasicStyle({
        ...variantProps,
        ...variedStyle.danger,
      }),
    },
  });

interface IStyleProps extends IVariantProps, DOMAttributes<HTMLHeadingElement> {
  background?: string;
  component: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  filter?: string;
  isGradient?: boolean;
  mixBlendMode?: string;
  textDecorator?: 'underline' | 'overline' | 'line-through' | string;
}
const getStyled = ({
  component,
  fontSize,
  fontWeight,
  isShow = true,
  marginVertical = 0,
}: IStyleProps) =>
  styled(component)<
    ComponentProps &
      ColorProps &
      FlexboxProps &
      LayoutProps &
      PositionProps &
      SpaceProps &
      TypographyProps
  >`
    appearance: none;
    filter: ${({ filter }: IStyleProps) => (filter ? filter : 'none')};
    background: ${({ background }: IStyleProps) =>
      background ? background : 'none'};
    white-space: pre-line;
    mix-blend-mode: ${({ mixBlendMode }: IStyleProps) =>
      mixBlendMode ? mixBlendMode : 'none'};
    ${getVariant({ fontSize, fontWeight, marginVertical })};
    ${getTextEllipsisCss};
    ${getTextDecoration};
    ${getCursor};
    ${colorFn};
    ${flexbox};
    ${layout};
    ${position};
    ${space};
    ${typography};
    display: ${(display: string) =>
      display ? display : isShow ? 'inherit' : 'none'};
    ${({ isGradient }: IStyleProps) =>
      `-webkit-background-clip: ${isGradient ? 'text' : 'inherit'}`};
    ${({ isGradient }: IStyleProps) =>
      `-webkit-text-fill-color: ${isGradient ? 'transparent' : 'inherit'}`};
  `;
// standard: https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element
export const Text = {
  h1: getStyled({
    component: 'h1',
    fontSize: 6, // 24px
    fontWeight: 'bold',
    marginVertical: 4,
  }),
  h2: getStyled({
    component: 'h2',
    fontSize: 5, // 20px
    fontWeight: 'bold',
    marginVertical: 4,
  }),
  h3: getStyled({
    component: 'h3',
    fontSize: 4, // 18px
    fontWeight: 'bold',
    marginVertical: 4,
  }),
  h4: getStyled({
    component: 'h4',
    fontSize: 3, // 16px
    fontWeight: 'bold',
    marginVertical: 4,
  }),
  h5: getStyled({ component: 'h5', fontSize: 2, fontWeight: 'normal' }), // 16px
  h6: getStyled({ component: 'h6', fontSize: 0, fontWeight: 'normal' }), // 11px
  s1: getStyled({ component: 'h2', fontSize: 4, fontWeight: 'boldUltra' }), // 18px
  s2: getStyled({ component: 'h2', fontSize: 2, fontWeight: 'bold' }), // 14px
  p1: getStyled({ component: 'p', fontSize: 5, fontWeight: 'light' }), // 20px
  p2: getStyled({ component: 'p', fontSize: 5, fontWeight: 'light' }), // 20px
  sp: getStyled({ component: 'span', fontSize: 5, fontWeight: 'light' }), // 20px
  c1: getStyled({ component: 'caption', fontSize: 5, fontWeight: 'light' }), // 20px
  c2: getStyled({ component: 'caption', fontSize: 1, fontWeight: 'normal' }), // 20px
  label: getStyled({ component: 'label', fontSize: 3, fontWeight: 'normal' }), // 20px
};
