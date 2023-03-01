import { LottieContainer } from './lottie.styles';
import React from 'react';
import Lottie, { Options } from 'react-lottie';
import * as animationData from '../../../assets/lottie/check_mark_confirm_circle_with_ripple_bounce.json';
import * as I from './lottie.interface';

const defaultOptions: Options = {
  // @ts-ignore
  animationData: animationData.default,
  autoplay: true,
  loop: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const CheckCircleWithRippleLottie = React.forwardRef(
  ({ isShow = true, height = 100, width = 100 }: I.LottieProps, ref) => (
    <LottieContainer isShow={isShow}>
      <Lottie
        options={defaultOptions}
        height={height}
        width={width}
        isClickToPauseDisabled={true}
        // @ts-ignore
        ref={ref}
      />
    </LottieContainer>
  ),
);
