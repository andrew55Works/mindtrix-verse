import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import {
  alignSelf,
  borders,
  color,
  flexbox,
  FlexboxProps,
  fontSize,
  gridArea,
  layout,
  LayoutProps,
  order,
  position,
  PositionProps,
  space,
  typography,
  zIndex,
} from 'styled-system';
import { ICommonBox } from '../../../types/common-box.types';

export interface ICommonFlex
  extends ICommonBox,
    FlexboxProps,
    LayoutProps,
    PositionProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  backgroundColorLinear?: string;
}

export const CommonBoxContainer: FC<ICommonBox> = styled.div<{
  backgroundColorLinear: string;
}>`
  box-sizing: border-box;
  ${color};
  ${fontSize};
  ${space};
  ${flexbox};
  ${order};
  ${alignSelf};
  ${borders};
  ${position};
  ${layout};
  ${zIndex};
  ${gridArea};
  ${typography};
`;

export const CommonFlexContainer: FC<ICommonFlex> = styled(CommonBoxContainer)<{
  backgroundColorLinear: string;
}>`
  display: flex;
  cursor: ${(props: ICommonFlex) => (props.onClick ? 'pointer' : 'normal')};
`;
