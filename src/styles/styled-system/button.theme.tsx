import _get from 'lodash.get';
import styled, { css } from 'styled-components';
import {
  borders,
  BordersProps,
  color as colorFn,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
  variant,
} from 'styled-system';
import * as React from 'react';
import { FC, HTMLAttributes } from 'react';
import { statusColorSystemHex, statusColorSystemStr } from './color.theme';
import { withDefaultPropsStyled } from '../../utils/styled-system.utils';

interface ComponentProps extends HTMLAttributes<HTMLButtonElement> {
  appearance: 'filled' | 'outline' | 'ghost';
  disabled?: boolean;
  LeftImage?: JSX.Element;
  size: 'tiny' | 'small' | 'medium' | 'large' | 'giant';
  status:
    | 'basic'
    | 'black'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'danger'
    | 'disabled';
}
type StyleSystemProps = ColorProps &
  TypographyProps &
  SpaceProps &
  FlexboxProps &
  BordersProps;

const styleSystemBase: StyleSystemProps = {
  backgroundColor: statusColorSystemStr.secondary,
  borderRadius: '1',
  fontFamily: 'default',
  fontSize: '3',
  paddingTop: 'p10',
  paddingRight: '5',
  paddingBottom: 'p10',
  paddingLeft: '5',
  margin: '1',
  lineHeight: 'default',
  justifyContent: 'center',
  alignItems: 'center',
};

interface IVariantProps {
  backgroundColor?: string;
  borderRadius?: string | number;
  color?: string | number;
}

const getVariantBasicStyle = ({
  backgroundColor,
  borderRadius = 1,
}: IVariantProps) => ({
  ...styleSystemBase,
  backgroundColor,
  borderRadius,
});

const variedStyle = {
  appearance: {
    filled: {},
    ghost: {
      backgroundColor: 'transparent',
    },
    outline: {
      backgroundColor: 'transparent',
    },
  },
  status: {
    black: {
      backgroundColor: statusColorSystemStr.basic,
      color: statusColorSystemStr.white,
    },
    basic: {
      backgroundColor: statusColorSystemStr.white,
    },
    primary: {
      backgroundColor: statusColorSystemStr.primary,
    },
    secondary: {
      backgroundColor: statusColorSystemStr.secondary,
    },
    danger: {
      backgroundColor: statusColorSystemStr.danger,
    },
    disabled: {
      backgroundColor: statusColorSystemStr.disabledBackground,
      color: statusColorSystemStr.disabledText,
    },
  },
};

const getVariant = (variantProps: IVariantProps) => ({
  appearance: variant({
    prop: 'appearance',
    variants: {
      filled: {},
      ghost: variedStyle.appearance.ghost,
      outline: variedStyle.appearance.outline,
    },
  }),
  status: variant({
    prop: 'status',
    variants: {
      basic: getVariantBasicStyle({
        ...variantProps,
        ...variedStyle.status.basic,
      }),
      black: getVariantBasicStyle({
        ...variantProps,
        ...variedStyle.status.black,
      }),
      primary: getVariantBasicStyle({
        ...variantProps,
        ...variedStyle.status.primary,
      }),
      secondary: getVariantBasicStyle({
        ...variantProps,
        ...variedStyle.status.secondary,
      }),
      danger: getVariantBasicStyle({
        ...variantProps,
        ...variedStyle.status.danger,
      }),
      disabled: getVariantBasicStyle({
        ...variantProps,
        ...variedStyle.status.disabled,
      }),
    },
  }),
});

const getVariedStyledComponent = ({
  appearance,
  disabled,
  status,
}: {
  appearance: string;
  disabled: boolean;
  status: string;
}) => {
  if (disabled) {
    return css`
      cursor: not-allowed;
      color: ${statusColorSystemHex.disabledText};
      border-style: ${appearance === 'outline' ? 'solid' : 'none'};
      border-width: ${appearance === 'filled' ? '0' : '1px'};
      border-color: ${statusColorSystemHex.disabledBorder};
      min-height: 46px;
      &:disabled {
        border-color: ${statusColorSystemHex.disabledBorder};
        border-width: 1px;
        border-style: ${appearance === 'ghost' ? 'none' : 'solid'};
      }
    `;
  } else {
    return css`
      cursor: pointer;
      color: ${appearance === 'filled'
        ? statusColorSystemHex.white
        : _get(statusColorSystemHex, status, 'secondary')};
      border-style: ${appearance === 'outline' ? 'solid' : 'none'};
      border-width: ${appearance === 'filled' ? '0' : '1px'};
      border-color: ${_get(statusColorSystemHex, status, 'secondary')};
      min-height: 46px;
      &:disabled {
        border-color: transparent;
        border-width: 0;
        border-style: none;
      }
      &:hover {
        filter: invert(0.1);
      }
    `;
  }
};

export const SVG: FC<ColorProps & LayoutProps & SpaceProps> =
  withDefaultPropsStyled(
    styled.div`
      display: flex;
      align-items: center;
      flex-shrink: 0;
      margin-right: 40px;
      height: 24px;
      width: 24px;
      ${layout};
      ${space};
      ${colorFn};
    `,
    {},
  );

interface IStyleProps extends IVariantProps {
  background?: string;
  component: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}
type ButtonProps = ComponentProps &
  BordersProps &
  ColorProps &
  LayoutProps &
  SpaceProps &
  TypographyProps &
  FlexboxProps &
  Pick<IStyleProps, 'background'> & {
    svgHeight?: string;
    svgMarginLeft?: string;
    svgMarginRight?: string;
    svgWidth?: string;
  };
const getStyled = ({ component, borderRadius }: IStyleProps) => styled(
  component,
)<ButtonProps>`
  appearance: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  ${getVariedStyledComponent};
  ${getVariant({ borderRadius }).status};
  ${getVariant({ borderRadius }).appearance};
  justify-content: flex-start;
  ${borders};
  ${colorFn};
  ${flexbox};
  ${layout};
  ${space};
  ${typography};
  ${({ background }: IStyleProps) =>
    background ? 'background: ' + background : {}};
`;

const ButtonComponent = getStyled({
  component: 'button',
  borderRadius: '1',
});

const getSquareButton: React.FC<ButtonProps> = ({
  children,
  LeftImage,
  svgHeight = '24px',
  svgWidth = '24px',
  svgMarginLeft = '0px',
  svgMarginRight = '40px',
  ...props
}) => {
  return (
    <ButtonComponent {...props}>
      {LeftImage ? (
        <SVG
          height={svgHeight}
          width={svgWidth}
          marginRight={svgMarginRight}
          marginLeft={svgMarginLeft}
        >
          {LeftImage}
        </SVG>
      ) : null}
      {children}
    </ButtonComponent>
  );
};
// standard: https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element
export const Button = {
  Square: getSquareButton,
  Oval: getStyled({
    component: 'button',
    borderRadius: '50%',
  }),
};
