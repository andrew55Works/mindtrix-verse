import styled from 'styled-components';
import { layout, LayoutProps, SpaceProps } from 'styled-system';
import space from '../../../../styles/styled-system/space.theme';

export const Cover = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: auto;
`;

export const LottieContainer = styled.div<LayoutProps & SpaceProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 150px;
  ${layout};
  ${space};
`;
