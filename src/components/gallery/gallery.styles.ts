import styled from 'styled-components';
import { colors } from '../../styles/styled-system/color.theme';
import { withDefaultPropsStyled } from '../../utils/styled-system.utils';
import { layout, LayoutProps, space, SpaceProps } from 'styled-system';
import { FC } from 'react';

export const EssenceGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(328px, 1fr));
  grid-gap: 20px;
  margin-bottom: 12px;
`;

export const Showroom = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 576px;
`;

export const Info = styled.article`
  display: flex;
  flex-direction: column;
  height: 576px;
  border-radius: 5px;
`;

export const SubInfo: FC<SpaceProps & LayoutProps> = withDefaultPropsStyled(
  styled.div`
    background-color: ${colors.primary[0]};
    border-radius: 5px;
    height: 504px;
    overflow-y: scroll;
    padding: 8px;
    ${space};
    ${layout};
  `,
  {},
);

export const Row: FC<SpaceProps> = withDefaultPropsStyled(
  styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    ${space};
  `,
  { my: '6px' },
);
