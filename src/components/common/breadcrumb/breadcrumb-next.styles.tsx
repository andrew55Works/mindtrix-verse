import styled from 'styled-components';
import { withDefaultPropsStyled } from '../../../utils/styled-system.utils';
import { space, SpaceProps } from 'styled-system';
import React, { FC } from 'react';

export const OLSvg = withDefaultPropsStyled(
  styled.span`
    width: 11px;
    height: 14px;
    padding-bottom: 6px;
    ${space};
  `,
  { marginRight: 4 },
);

export const OL = withDefaultPropsStyled(
  styled.ol`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    ${space};
  `,
  {},
);

export const LI = withDefaultPropsStyled(
  styled.li`
    list-style-type: none;
    max-width: 550px;
    ${space};
  `,
  { marginRight: 4 },
);

export const A: FC<React.AnchorHTMLAttributes<HTMLAnchorElement> & SpaceProps> =
  withDefaultPropsStyled(
    styled.a`
      text-decoration: none;
      ${space};
    `,
    {},
  );
