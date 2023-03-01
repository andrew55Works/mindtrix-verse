import React, { useState } from 'react';
import { Text } from '../../../styles/styled-system/text.theme';
import * as UIKitten from '@ui-kitten/components';
import { useQuery } from '@apollo/client';
import { GetConfirmPassword } from '../../../api/types/user.types';
import { GQL_GET_CONFIRM_PASSWORD } from '../../../api/graphql/user.graphql';
import { useSelector } from 'react-redux';
import { selectCreatorProfile } from '../../../redux/creator/creator.selector';
import FramerModal, { FramerModalProps } from './framer-modal';
import CommonInputWithWarning from '../input/common-input';
import { passwordRegEx } from '../../../utils/form-validation.utils';
import { useCreatorCommonI18n } from '../../../hooks/i18n/i18n.hooks';

export interface ModalProps extends UIKitten.ModalProps {
  isShowInput?: boolean;
  mutableValue: {
    password: string;
  };
  onChange: {
    passwordInputFn: (nextValue: string) => void;
  };
  onClick: {
    confirmFn: () => void;
    dismissFn: () => void;
  };
  text: {
    description?: string | JSX.Element;
    leftButton?: string;
    placeholder: string;
    rightButton: string;
    title: string;
  };
}

export const ConfirmPassword = (props: ModalProps) => {
  const {
    onChange: { passwordInputFn },
    onClick: { confirmFn, dismissFn },
    mutableValue: { password = '' },
    visible = false,
    isShowInput = true,
  } = props;
  const { text } = useCreatorCommonI18n();
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const creator = useSelector(selectCreatorProfile);
  const creator_id = creator?._id ?? '';
  const wallet_address = creator?.wallet?.blocto?.address ?? '';
  const { refetch: confirmPasswordApi } = useQuery<GetConfirmPassword>(
    GQL_GET_CONFIRM_PASSWORD,
    {
      skip: true,
      onError: (error) => {
        console.error('confirmPassword error:', error);
      },
    },
  );
  const onClick = {
    confirmPassword: async () => {
      const confirmRes = await confirmPasswordApi({
        password,
        user_id: creator_id,
        wallet_address,
      });
      const isPass = confirmRes?.data?.confirmPassword?.isPassed ?? false;
      setIsPasswordCorrect(isPass);
      if (isPass) confirmFn();
    },
  };
  const {
    description = undefined,
    title,
    leftButton,
    rightButton,
    placeholder,
  } = props.text;
  const styles = {
    container: {
      display: visible ? 'flex' : 'none',
      minHeight: 206,
      width: 490,
    },
    input: {
      width: 490,
    },
  };

  const framerModalProps: FramerModalProps = {
    isEnableDismissModalFromClickingBackground: false,
    isShowModal: visible,
    onClick: {
      dismissModalFn: dismissFn,
      leftButton: dismissFn,
      rightButton: onClick.confirmPassword,
    },
    text: {
      description,
      leftButton,
      rightButton,
      title,
    },
  };
  return (
    <FramerModal {...framerModalProps}>
      {isShowInput ? (
        <>
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
          {isPasswordCorrect ? null : (
            <Text.h3
              margin={0}
              status={'danger'}
              alignSelf={'flex-start'}
              children={text.p_verify_password_error}
            />
          )}
        </>
      ) : null}
    </FramerModal>
  );
};
