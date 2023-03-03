import React, { FC } from 'react';
import { inputRWD } from '../../../styles/styled-system/styled-system.config';
import { ColorProps } from 'styled-system';
import {
  CommonInputErrorMessageContainer,
  ErrorIcon,
} from './common-message.styles';
import ExclamationSvg from '../../../assets/svg/exclamation-circle.svg';
import { Text } from '../../../styles/styled-system/text.theme';
import { statusColorSystemHex } from '../../../styles/styled-system/color.theme';

export interface IInputLabel extends ColorProps {
  className: string;
  label?: string;
}

export interface IErrorMessageContainer {
  errorMessage: string;
  isShowErrorMessage: boolean;
  isPaddingLeft: boolean;
}

const CommonMessageError: FC<IErrorMessageContainer> = ({
  errorMessage,
  isShowErrorMessage,
  isPaddingLeft = true,
}) =>
  isShowErrorMessage ? (
    <CommonInputErrorMessageContainer
      paddingLeft={isPaddingLeft ? inputRWD.normal.paddingLeft : 0}
    >
      <ErrorIcon>
        <ExclamationSvg fill={statusColorSystemHex.danger} />
      </ErrorIcon>
      <Text.h3
        status={'danger'}
        lineHeight={1.3}
        fontSize={'14px'}
        margin={0}
        isAutoWrap={true}
        textAlign={'left'}
      >
        {errorMessage}
      </Text.h3>
    </CommonInputErrorMessageContainer>
  ) : null;

export default CommonMessageError;
