import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { _style, framerVariants } from './framer-model.styles';
import { Text } from '../../../styles/styled-system/text.theme';
import { CommonFlexContainer } from '../flexbox/common-flex.styles';
import { TimerProps } from '../../../hooks/timer/timer.hooks';

interface Props extends Pick<TimerProps, 'seconds' | 'isTimesUp'> {
  isShow: boolean;
  startText: string;
}
// should be used with the useTime() hook
export const CountdownModal: FC<Props> = ({ seconds, isShow, startText }) => {
  const text = {
    countdown: seconds === 0 ? startText : seconds.toString(),
  };
  return (
    <AnimatePresence exitBeforeEnter={true}>
      {isShow && (
        <motion.div
          style={_style.backgroundCover()}
          variants={framerVariants.backgroundCover}
          initial={'hidden'}
          animate={'visible'}
          exit={'hidden'}
        >
          <CommonFlexContainer
            width={'100%'}
            height={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Text.h2
              status={'primary'}
              fontSize={'100px'}
              color={'white'}
              children={text.countdown}
            />
          </CommonFlexContainer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
