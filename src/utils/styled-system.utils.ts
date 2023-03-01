import { css } from 'styled-components';
import { ITextBaseStyleAttrs } from '../components/common/input/common-message.styles';
import {
  breakpoints,
  inputRWD,
} from '../styles/styled-system/styled-system.config';
import {
  ICommonInputStatusProps,
  IMedia,
} from '../types/styled-system.interface';
import { colors } from '../styles/styled-system/color.theme';

export const withDefaultPropsStyled = (WrappedComponent: React.FC, T: any) => {
  WrappedComponent.defaultProps = Object.assign(
    {},
    T,
    WrappedComponent.defaultProps,
  );
  return WrappedComponent;
};

const keysOfBreakpoints = Object.keys(breakpoints) as Array<
  keyof typeof breakpoints
>;
export const media = keysOfBreakpoints.reduce((acc, label: any) => {
  acc[label] = (first: any, ...interpolations: Array<any>) => css`
    // @ts-ignore
    @media (min-width: ${breakpoints[label]}) {
      ${css(first, ...interpolations)};
    }
  `;
  return acc;
}, {} as IMedia);

export const mediaMax = keysOfBreakpoints.reduce((acc, label: any) => {
  acc[label] = (first: any, ...interpolations: Array<any>) => css`
    // @ts-ignore
    @media (max-width: ${breakpoints[label]}) {
      ${css(first, ...interpolations)};
    }
  `;
  return acc;
}, {} as IMedia);

export const getFocusWithoutDefaultOutline = () => css`
  &:focus {
    outline: none;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const getInputStatusCSS = ({
  disabled,
  isNoneBorderStyle = false,
  isError,
}: ICommonInputStatusProps) => {
  if (disabled) {
    return css`
      background-color: ${colors.basic[4]};
      border: ${inputRWD.disabled};
      cursor: not-allowed;
    `;
  }
  if (isError) {
    return css`
      border: ${inputRWD.error.border};
    `;
  }
  if (isNoneBorderStyle) {
    return css`
      border: 2px transparent solid;
      background-color: ${colors.basic[3]};
      caret-color: ${colors.basic[8]};
      &:focus-within {
        border: 2px ${colors.basic[8]} solid;
      }
    `;
  }
  return css`
    border: ${inputRWD.normal.border};
  `;
};

const fontSizeRWD = {
  annotatoin: '.75rem',
  normal: '1rem',
};

export const textAnnotationStyleSystem = (props?: ITextBaseStyleAttrs) => ({
  ...fontSizeRWD,
  fontSize: 1,
  alignItems: 'flex-start',
  display: 'inline-flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginTop: '2',
  paddingBottom: '0px',
  paddingTop: '0px',
  width: '100%',
  ...props,
});
