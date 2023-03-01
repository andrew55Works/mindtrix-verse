import { FC } from 'react';
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
import { withDefaultPropsStyled } from '../../../../utils/styled-system.utils';
import {
  colors,
  statusColorSystemHex,
} from '../../../../styles/styled-system/color.theme';

export const HeaderRowTableStyle: FC<
  ColorProps & FlexboxProps & SpaceProps & LayoutProps
> = withDefaultPropsStyled(
  styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex: 1;
    flex-direction: row;
    font-family: Roboto-Regular;
    font-weight: bold;
    padding-left: 10px;
    min-height: 44px;
    ${color};
    ${flexbox};
    ${space};
    ${layout};
  `,
  {
    color: 'basic.0',
  },
);

export const RowTableStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  width: 100%;
  cursor: pointer;
  padding-top: 4px;
  padding-bottom: 4px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.primary[7]};
  border-bottom-style: solid;
  &:hover {
    background-color: ${statusColorSystemHex.disabledBorder};
  }
`;

export const RowChildColumnStyle: FC<FlexboxProps & LayoutProps> =
  withDefaultPropsStyled(
    styled.div`
      display: flex;
      flex: 1;
      flex-direction: row;
      align-items: center;
      font-family: Roboto-Regular;
      padding-left: 10px;
      height: 100%;
      min-height: 44px;
      ${flexbox};
      ${layout};
    `,
    {},
  );
