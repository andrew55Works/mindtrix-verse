/*
 * Copyright (C) 2017 - 2021. La Vida Tec Co., Ltd. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, { ChangeEvent, FC, HTMLAttributes, useState } from 'react';
import { SpaceProps } from 'styled-system';
import { validateText } from '../../../hooks/common/text/text.hooks';
import { CommonFlexContainer } from '../flexbox/common-flex.styles';
import { ITextValidate } from './common-input';
import * as S from './common-input.styles';
import { TextLengthLabel } from './common-input.styles';
import CommonMessageError from './common-message-error.component';

export interface ICommonInputTextArea
  extends Omit<HTMLAttributes<HTMLTextAreaElement>, 'onChange'>,
    ITextValidate,
    SpaceProps {
  autocomplete: string;
  customValidation?: (value: string | undefined) => boolean;
  defaultValue?: string;
  disabled?: boolean;
  errorMessage?: string;
  height?: number | string;
  isShow?: boolean;
  label?: string;
  marginBottom?: string | number;
  maxLength: number;
  minLength?: number;
  name: string;
  onChange?: (value: any, isValid: boolean) => void;
  type?: string;
  value?: string;
  width?: string;
}

const CommonInputTextAreaWithWarning: FC<ICommonInputTextArea> = ({
  customValidation,
  errorMessage,
  defaultValue,
  maxLength = 300,
  value,
  width = 'inherit',
  onChange,
  marginBottom = 4,
  type = 'text',
  pattern,
  isShow = true,
  ...props
}) => {
  const [isPass, setIsPass] = useState(true);
  const isShowErrorMessage = !isPass;
  const valueLength = value?.length ?? 0;
  const defaultValueLength = defaultValue?.length ?? 0;
  const _onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const v = e?.target?.value ?? null;
    const isPassTmp = validateText({ customValidation, pattern, value: v });
    setIsPass(isPassTmp);
    onChange && onChange(v, isPass);
  };

  return isShow ? (
    <S.CommonInputWrapper marginBottom={marginBottom} width={width}>
      <CommonFlexContainer position='relative'>
        <S.CommonInputTextArea
          onChange={_onChange}
          isError={isShowErrorMessage}
          defaultValue={defaultValue}
          maxLength={maxLength}
          value={value}
          {...props}
        />
        <TextLengthLabel>
          {valueLength}/{maxLength}
        </TextLengthLabel>
      </CommonFlexContainer>
      <CommonMessageError
        errorMessage={errorMessage ? errorMessage : ''}
        isShowErrorMessage={isShowErrorMessage}
      />
    </S.CommonInputWrapper>
  ) : null;
};
CommonInputTextAreaWithWarning.displayName = 'CommonInputTextAreaWithWarning';
export default CommonInputTextAreaWithWarning;
