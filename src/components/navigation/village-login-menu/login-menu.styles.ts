import { FC, HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { withDefaultPropsStyled } from '../../../utils/styled-system.utils';
import {
  borders,
  color,
  flexbox,
  FlexboxProps,
  shadow,
  space,
} from 'styled-system';

export const Container: FC<HTMLAttributes<HTMLDivElement>> =
  withDefaultPropsStyled(
    styled.div`
      display: none;
      flex-direction: column;
      position: absolute;
      top: 52px;
      width: 344px;
      right: 150px;
      z-index: 500;
      ${color};
      ${borders};
      ${space};
      ${shadow};
    `,
    {
      backgroundColor: 'basic.0',
      borderColor: 'basic.8',
      borderRadius: 1,
      boxShadow: 'menu',
    },
  );

interface MenuUnitProps {
  isShow?: boolean;
}

const getIsShowCss = css`
  display: ${({ isShow = true }: MenuUnitProps) => (isShow ? 'flex' : 'none')};
`;

const Row: FC<FlexboxProps & MenuUnitProps> = withDefaultPropsStyled(
  styled.div`
    ${getIsShowCss};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    ${borders};
    ${color};
    ${space};
    ${flexbox};
  `,
  { px: '18px', py: '18px', borderBottom: 1, borderColor: '#D9D9D9' },
);

const Column: FC<FlexboxProps & MenuUnitProps> = withDefaultPropsStyled(
  styled.div`
    ${getIsShowCss};
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    ${borders};
    ${color};
    ${space};
    ${flexbox};
  `,
  { px: '18px', py: '18px', borderBottom: 1, borderColor: '#D9D9D9' },
);

export const Menu = {
  Row,
  Column,
};
