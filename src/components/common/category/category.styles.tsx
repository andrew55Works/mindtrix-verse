import styled from 'styled-components';
import { withDefaultPropsStyled } from '../../../utils/styled-system.utils';
import { color, ColorProps, space, SpaceProps } from 'styled-system';
import { FC } from 'react';

export const Container: FC<ColorProps & SpaceProps> = withDefaultPropsStyled(
  styled.label`
    border-radius: 30px;
    ${color};
    ${space};
  `,
  {
    backgroundColor: 'primary.6',
    color: 'basic.0',
    px: '4',
    py: '6px',
    marginRight: 4,
    marginBottom: 3,
  },
);
