import React, { FC } from 'react';
import { inputRWD } from '../../../styles/styled-system/styled-system.config';
import { ColorProps } from 'styled-system';
import { CommonInputErrorMessageContainer } from './common-message.styles';
import { Text } from '../../../styles/styled-system/text.theme';

export interface IInputLabel extends ColorProps {
  className: string;
  label?: string;
}

export interface IErrorMessageContainer {
  isShowMessage: boolean;
  message: string | JSX.Element;
}

const CommonMessageDefault: FC<IErrorMessageContainer> = ({
  isShowMessage,
  message,
}) =>
  isShowMessage ? (
    <CommonInputErrorMessageContainer paddingLeft={inputRWD.normal.paddingLeft}>
      <Text.h6
        status={'basic'}
        lineHeight={1.3}
        isAutoWrap={true}
        textAlign={'left'}
        color={'rgba(0, 0, 0, 0.6)'}
      >
        {message}
      </Text.h6>
    </CommonInputErrorMessageContainer>
  ) : null;

export default CommonMessageDefault;
