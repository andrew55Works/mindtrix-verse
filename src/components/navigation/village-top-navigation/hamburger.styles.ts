import { MotionStyle } from 'framer-motion';
import { Variants } from 'framer-motion/types/types';
import styled from 'styled-components';

export const framer = {
  style: {
    modal: (pageBackground?: string): MotionStyle => ({
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: '54px',
      left: 0,
      height: '100%',
      width: '100%',
      background: pageBackground ? pageBackground : 'rgba(255, 255, 255, 1)',
      justifyContent: 'flex-start',
      alignItems: 'center',
      zIndex: 9999,
      overflow: 'auto',
    }),
  },
  variant: {
    modal: (): Variants => ({
      hidden: {
        top: '-100%',
        left: 0,
        opacity: 0,
        transition: {
          delay: 0.2,
        },
      },
      visible: {
        opacity: 1,
        position: 'fixed',
        bottom: 0,
        top: '54px',
        transition: {
          delay: 0.2,
        },
      },
    }),
  },
};
