import { FC, HTMLAttributes, RefAttributes } from 'react';
import styled from 'styled-components';
import {
  border,
  BorderProps,
  color,
  ColorProps,
  display,
  flexbox,
  FlexboxProps,
  FontSizeProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system';
import {
  commonMargin,
  inputRWD,
  textareaRWD,
} from '../../../styles/styled-system/styled-system.config';
import {
  ICommonInputProps,
  ICommonInputStatusProps,
  ICommonInputTextAreaProps,
} from '../../../types/styled-system.interface';
import {
  getFocusWithoutDefaultOutline,
  getInputStatusCSS,
  withDefaultPropsStyled,
} from '../../../utils/styled-system.utils';

export const inputDefaultStyleSystem = (
  props?: ColorProps & LayoutProps & SpaceProps & FontSizeProps,
) => ({
  ...inputRWD.normal,
  ...props,
});

export const inputTextAreaDefaultStyleSystem = (
  props?: ColorProps & LayoutProps & SpaceProps & FontSizeProps,
) => ({
  ...textareaRWD.normal,
  ...props,
});

export const CommonInputWrapper: FC<
  LayoutProps & ColorProps & SpaceProps & FlexboxProps
> = withDefaultPropsStyled(
  styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    input[type='password'] {
      letter-spacing: 0.2px;
    }
    ${color};
    ${layout};
    ${space};
    ${flexbox};
  `,
  {
    ...commonMargin,
  },
);

export const CommonInputRawWrapper: FC<
  ICommonInputStatusProps &
    BorderProps &
    ColorProps &
    LayoutProps &
    FlexboxProps &
    TypographyProps
> = withDefaultPropsStyled(
  styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    ${border};
    ${color};
    ${layout};
    ${space};
    ${typography};
    ${flexbox};
    ${getInputStatusCSS};
  `,
  inputDefaultStyleSystem(),
);

export const InputSVG: FC<HTMLAttributes<HTMLDivElement> & SpaceProps> =
  withDefaultPropsStyled(
    styled.div`
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 24px;
      width: 24px;
      ${space};
    `,
    {},
  );

export const CommonInput: FC<
  ICommonInputProps & LayoutProps & RefAttributes<HTMLInputElement>
> = withDefaultPropsStyled(
  styled.input.attrs<ICommonInputProps & LayoutProps>(
    ({ maxLength, name, placeholder, type }) => ({
      maxLength: maxLength || '200',
      name: name || null,
      placeholder: placeholder || null,
      type: type || 'text',
    }),
  )`
    ${getFocusWithoutDefaultOutline};
    ${border};
    ${color};
    ${display};
    ${typography};
    ${layout};
    ${space};
    ${flexbox};
    font-family: inherit;
    background-color: inherit;
    border: 0;
    flex-grow: 1;
    &::placeholder {
      color: rgb(143, 155, 179);
      opacity: 1;
    }
  `,
  {},
);

export const CommonInputTextArea: FC<ICommonInputTextAreaProps> =
  withDefaultPropsStyled(
    styled.textarea.attrs<ICommonInputTextAreaProps>(
      ({ maxLength, name, placeholder, type }) => ({
        maxLength: maxLength || '200',
        name: name || null,
        placeholder: placeholder || null,
        type: type || 'text',
      }),
    )`
      ${getFocusWithoutDefaultOutline};
      ${border};
      ${color};
      ${display};
      ${typography};
      ${layout};
      ${space};
      ${flexbox};
      ${getInputStatusCSS};
      &::placeholder {
        color: rgb(143, 155, 179);
        opacity: 1;
      }
      resize: none;
    `,
    inputTextAreaDefaultStyleSystem(),
  );

export const TextLengthLabel: FC<{}> = styled.span`
  position: absolute;
  font-family: Roboto-Regular, sans-serif;
  margin: 6px;
  font-size: 12px;
  right: 0;
  bottom: 0;
  color: rgb(143, 155, 179);
`;
