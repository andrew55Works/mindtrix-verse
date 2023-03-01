import styled from 'styled-components';
import { colors } from '../../../../styles/styled-system/color.theme';

export const OptionContainer = styled.div`
  cursor: pointer;
  height: 40px;
  width: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  &:hover {
    background-color: ${colors.primary[3]};
  }
`;

export const SVG = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  &:hover {
    background-color: ${colors.primary[3]};
  }
`;
