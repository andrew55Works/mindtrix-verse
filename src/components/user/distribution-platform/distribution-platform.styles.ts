import styled from 'styled-components';
import { colors } from '../../../styles/styled-system/color.theme';

export const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 20px;
  width: 100%;
`;

export const ItemContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 200px;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid ${colors.primary[4]};
`;

export const PlatformSavedIcon = styled.div`
  position: absolute;
  height: 24px;
  width: 24px;
  right: 0;
  bottom: 0;
  margin: 12px;
`;

export const SVG = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 12px;
`;
