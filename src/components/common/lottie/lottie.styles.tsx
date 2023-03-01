import * as I from './lottie.interface';
import styled from 'styled-components';
import { layout, LayoutProps, space, SpaceProps } from 'styled-system';

export const LottieContainer = styled.div<
  Pick<I.LottieProps, 'isShow'> & LayoutProps & SpaceProps
>`
  height: 100%;
  width: 100%;
  display: ${(props) => (props.isShow ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 999;
  ${layout};
  ${space}
`;

export const LottieContainer2 = styled.div<
  Pick<I.LottieProps, 'isShow'> & LayoutProps & SpaceProps
>`
  height: 100%;
  display: ${(props) => (props.isShow ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
