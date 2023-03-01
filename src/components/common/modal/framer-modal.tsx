import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { _style, framerVariants, Modal } from './framer-model.styles';
import { statusColorSystemStr } from '../../../styles/styled-system/color.theme';
import { Text } from '../../../styles/styled-system/text.theme';

export interface FramerModalProps {
  isEnableDismissModalFromClickingBackground?: boolean;
  isShowModal: boolean;
  maxWidth?: string;
  onClick: {
    dismissModalFn: () => void;
    leftButton?: () => void;
    rightButton?: () => void;
  };
  style?: {
    headerJustifyContent?: string;
    maxHeight?: string;
    padding?: string;
    transitionY?: string;
  };
  text: {
    description?: string | JSX.Element;
    leftButton?: string;
    rightButton?: string;
    title?: string;
  };
  width?: string;
}
const FramerModal: FC<FramerModalProps> = ({
  children,
  isEnableDismissModalFromClickingBackground = true,
  isShowModal,
  onClick,
  text,
  maxWidth = '100vw',
  width = '40vw',
  style,
}) => {
  const modalPadding = style?.padding ?? '30px 20px 20px 20px';
  const transitionY = style?.transitionY ?? '300px';
  const maxHeight = style?.maxHeight ?? '66%';
  const _onClick = {
    backgroundCover: () => {
      if (!isEnableDismissModalFromClickingBackground) return;
      onClick.dismissModalFn();
    },
  };
  return (
    <AnimatePresence exitBeforeEnter={true}>
      {isShowModal && (
        <motion.div
          style={_style.backgroundCover()}
          variants={framerVariants.backgroundCover}
          initial={'hidden'}
          animate={'visible'}
          exit={'hidden'}
          onClick={_onClick.backgroundCover}
        >
          <motion.div
            style={_style.modal(modalPadding, maxHeight, maxWidth)}
            variants={framerVariants.modal(transitionY)}
            onClick={(e) => e.stopPropagation()}
          >
            <Modal.Button.HeaderCross
              isShow={true}
              onClick={onClick.dismissModalFn}
            />
            <Modal.Header
              text={text?.title ?? ''}
              justifyContent={style?.headerJustifyContent ?? 'flex-start'}
            />
            <Modal.Body>
              {text?.description ?? null ? (
                <div style={{ width }}>
                  <Text.h3
                    status={'basic'}
                    textAlign={'left'}
                    color={statusColorSystemStr.disabledText}
                    marginBottom={4}
                    isAutoWrap={true}
                    children={text?.description ?? ''}
                  />
                </div>
              ) : null}
              {children}
            </Modal.Body>
            <Modal.Footer>
              <Modal.Button.Footer
                text={text?.leftButton ?? ''}
                onClick={onClick?.leftButton}
              />
              <Modal.Button.Footer
                text={text?.rightButton ?? ''}
                onClick={onClick?.rightButton}
              />
            </Modal.Footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FramerModal;
