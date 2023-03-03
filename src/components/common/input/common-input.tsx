/*
 * Copyright (C) 2017 - 2021. La Vida Tec Co., Ltd. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {
  ChangeEvent,
  forwardRef,
  HTMLAttributes,
  useState,
} from 'react';
import { ColorProps, SpaceProps } from 'styled-system';
import { validateText } from '../../../hooks/common/text/text.hooks';
import * as S from './common-input.styles';
import CommonMessageError from './common-message-error.component';
import { Text } from '../../../styles/styled-system/text.theme';
import CommonMessageDefault from './common-message-default.component';
import CrossSvg from '../../../assets/svg/icon_cross.svg';

export interface ITextValidate {
  customValidation?: (value: string | undefined) => boolean;
  pattern?: RegExp;
  value?: string;
}

export interface ICommonPasswordInterface
  extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'>,
    ITextValidate,
    ColorProps,
    SpaceProps {
  autocomplete: string;
  customValidation?: (value: string | undefined) => boolean;
  defaultMessage?: string | JSX.Element;
  defaultValue?: string;
  disabled?: boolean;
  errorMessage?: string;
  height?: number | string;
  isNoneBorderStyle?: boolean;
  isShow?: boolean;
  isShowCrossIcon?: boolean;
  label?: string;
  marginBottom?: string | number;
  maxHeight?: number | string;
  maxLength: number;
  maxWidth?: number | string;
  minLength?: number;
  minWidth?: number | string;
  name: string;
  onChange?: (value: any, isValid: boolean) => void;
  placeholder?: string;
  rightIcon?: JSX.Element;
  type?: string;
  unit?: string;
  value?: string;
  width?: number | string;
}

const CommonInputWithWarning = forwardRef<any, ICommonPasswordInterface>(
  (
    {
      customValidation,
      backgroundColor = 'inherit',
      errorMessage,
      defaultMessage,
      defaultValue,
      value,
      onChange,
      placeholder = '',
      marginBottom = 4,
      maxHeight,
      type = 'text',
      unit,
      pattern,
      isNoneBorderStyle = false,
      isShow = true,
      isShowCrossIcon = false,
      width = 'inherit',
      maxWidth,
      minWidth,
      rightIcon,
      id,
      ...props
    },
    ref,
  ) => {
    const [isPass, setIsPass] = useState(true);
    const [isShowCrossSvg, setIsShowCrossSvg] = useState(false);
    const isShowErrorMessage = !isPass;
    const isShowDefaultMessage = !!defaultMessage && !isShowErrorMessage;
    const valueLength = value?.length ?? 0;
    const defaultValueLength = defaultValue?.length ?? 0;
    const refEle = React.createRef<HTMLInputElement>();
    const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const v = e?.target?.value ?? null;
      const isPassTmp = validateText({ customValidation, pattern, value: v });
      setIsPass(isPassTmp);
      onChange && onChange(v, isPassTmp);
      if (isShowCrossIcon) {
        setIsShowCrossSvg(!!v);
      }
    };

    const clearValue = (e: React.MouseEvent<HTMLDivElement>) => {
      const emptyValue = '';
      if (refEle?.current !== null) {
        refEle.current.value = emptyValue;
      }
      const eTemp = e as any as ChangeEvent<HTMLInputElement>;
      eTemp.target.value = emptyValue;
      _onChange(eTemp);
    };
    return isShow ? (
      <S.CommonInputWrapper
        marginBottom={marginBottom}
        flex={!!width && width !== 'inherit' ? 'initial' : '1'}
        width={width}
        maxWidth={maxWidth}
        minWidth={minWidth}
      >
        <S.CommonInputRawWrapper
          disabled={props?.disabled ?? false}
          isError={isShowErrorMessage}
          isNoneBorderStyle={isNoneBorderStyle}
          backgroundColor={backgroundColor}
        >
          <S.CommonInput
            onChange={_onChange}
            defaultValue={defaultValue}
            type={type}
            value={value}
            placeholder={placeholder}
            maxHeight={maxHeight}
            ref={refEle}
            id={id}
            {...props}
          />
          {isShowCrossSvg && isShowCrossIcon ? (
            <S.InputSVG
              onClick={clearValue}
              marginRight={2}
              children={<CrossSvg />}
            />
          ) : null}
          {rightIcon ? <S.InputSVG children={rightIcon} /> : null}
        </S.CommonInputRawWrapper>
        <CommonMessageError
          errorMessage={errorMessage ? errorMessage : ''}
          isShowErrorMessage={isShowErrorMessage}
        />
        <CommonMessageDefault
          message={defaultMessage ? defaultMessage : ''}
          isShowMessage={isShowDefaultMessage}
        />
        {unit ? (
          <Text.h3
            status={'basic'}
            position={'absolute'}
            my={0}
            top={'20%'}
            right={'16px'}
            children={unit}
          />
        ) : null}
      </S.CommonInputWrapper>
    ) : null;
  },
);
CommonInputWithWarning.displayName = 'CommonInputWithWarning';
export default CommonInputWithWarning;
