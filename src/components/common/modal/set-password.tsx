import React, { CSSProperties } from 'react';
import { Text } from '../../../styles/styled-system/text.theme';
import Button, { ButtonAppearanceEnum, ButtonStatusEnum } from '../button';
import FramerModal, { FramerModalProps } from './framer-modal';
import CommonInputWithWarning from '../input/common-input';
import { passwordRegEx } from '../../../utils/form-validation.utils';
import { useCreatorRegisterI18n } from '../../../hooks/i18n/i18n.hooks';

export interface ModalProps {
  mutableValue: {
    password: string;
  };
  onChange: {
    passwordInputFn: (nextValue: string) => void;
  };
  onClick: {
    dismissFn: () => void;
  };
  text: {
    leftButton: string;
    placeholder: string;
    rightButton: string;
    title: string;
  };
  visible: boolean;
}

export const SetPassword = (props: ModalProps) => {
  const {
    onChange: { passwordInputFn },
    onClick: { dismissFn },
    mutableValue: { password = '' },
    visible = false,
  } = props;
  const { title, leftButton, rightButton, placeholder } = props.text;
  const { text } = useCreatorRegisterI18n();
  const styles: { [key: string]: CSSProperties } = {
    container: {
      display: visible ? 'flex' : 'none',
      minHeight: '206px',
      width: '490px',
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    input: {
      width: 490,
    },
    footerButtonContainer: {
      alignItems: 'flex-end',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-end',
    },
  };
  const framerModalProps: FramerModalProps = {
    isEnableDismissModalFromClickingBackground: false,
    isShowModal: visible,
    onClick: {
      dismissModalFn: dismissFn,
      leftButton: undefined,
      rightButton: undefined,
    },
    text: {
      description: undefined,
      leftButton: undefined,
      rightButton: undefined,
      title: undefined,
    },
  };
  return (
    <div style={styles.container}>
      <FramerModal {...framerModalProps}>
        <Text.h1
          status={'basic'}
          children={title}
          alignSelf={'flex-start'}
          marginTop={0}
        />
        <CommonInputWithWarning
          autocomplete={'off'}
          pattern={passwordRegEx}
          style={styles.input}
          type={'password'}
          errorMessage={text.p_invite_code_format_reminder}
          name={'password-input'}
          placeholder={placeholder}
          value={password}
          maxLength={40}
          onChange={passwordInputFn}
        />
        <div style={styles.footerButtonContainer}>
          <Button.Square
            onClick={dismissFn}
            label={leftButton}
            status={ButtonStatusEnum.control}
          />
          <Button.Square
            onClick={dismissFn}
            label={rightButton}
            status={ButtonStatusEnum.secondary}
            appearance={ButtonAppearanceEnum.ghost}
          />
        </div>
      </FramerModal>
    </div>
  );
};
