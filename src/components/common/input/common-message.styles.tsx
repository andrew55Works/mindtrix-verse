import { FC } from 'react';
import styled from 'styled-components';
import {
  color,
  ColorProps,
  display,
  DisplayProps,
  flexbox,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system';
import {
  textAnnotationStyleSystem,
  withDefaultPropsStyled,
} from '../../../utils/styled-system.utils';

export interface ITextBaseStyleAttrs
  extends ColorProps,
    DisplayProps,
    LayoutProps,
    SpaceProps,
    TypographyProps {}

export const CommonInputErrorMessageContainer: FC<ITextBaseStyleAttrs> =
  withDefaultPropsStyled(
    styled.div`
      ${display};
      ${typography};
      ${color};
      ${flexbox};
      ${space};
      ${layout};
    `,
    {
      ...textAnnotationStyleSystem(),
    },
  );

export const ErrorIcon = styled.span`
  display: inline-block;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-top: 0.05rem;
  margin-right: 4px;
`;
