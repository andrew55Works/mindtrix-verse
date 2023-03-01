import { ButtonProps, ButtonStatusEnum, default as Button } from './index';
import { StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '@ui-kitten/components';

export enum PRODUCT_STATUS_ENUM {
  // NONE 為初始狀態、已與 RSS 同步
  NONE = 'NONE',
  DRAFT = 'DRAFT',
  ENDED = 'ENDED',
  ERROR = 'ERROR',
  LISTED = 'LISTED',
  LISTING = 'LISTING',
}

export interface ProductStatusButtonProps
  extends Omit<ButtonProps, 'status' | 'appearance'> {
  productStatus: PRODUCT_STATUS_ENUM;
}

export const ProductStatusButton = ({
  style: customStyle,
  productStatus,
  label,
  ...props
}: ProductStatusButtonProps) => {
  const theme = useTheme();
  if (!theme) return null;
  const tmpStyle = {
    backgroundColor: theme['color-primary-200'],
    borderColor: theme['color-primary-200'],
    color: theme['text-secondary-color'],
  };
  let status = ButtonStatusEnum.primary;
  let isDisabled = false;
  let buttonText;
  switch (productStatus) {
    case PRODUCT_STATUS_ENUM.DRAFT: {
      buttonText = '暫存';
      tmpStyle.backgroundColor = theme['color-primary-200'];
      tmpStyle.borderColor = theme['color-primary-200'];
      tmpStyle.color = theme['text-black-color'];
      status = ButtonStatusEnum.draft;
      isDisabled = false;
      break;
    }
    case PRODUCT_STATUS_ENUM.LISTING: {
      buttonText = '上架中';
      tmpStyle.backgroundColor = theme['color-info-500'];
      tmpStyle.borderColor = theme['color-info-500'];
      status = ButtonStatusEnum.info;
      isDisabled = false;
      break;
    }
    case PRODUCT_STATUS_ENUM.LISTED: {
      buttonText = '已上架';
      tmpStyle.backgroundColor = theme['color-primary-500'];
      tmpStyle.borderColor = theme['color-primary-500'];
      status = ButtonStatusEnum.primary;
      isDisabled = false;
      break;
    }
    case PRODUCT_STATUS_ENUM.ENDED: {
      buttonText = '結束販售';
      tmpStyle.backgroundColor = theme['color-primary-disabled'];
      tmpStyle.borderColor = theme['color-primary-disabled'];
      tmpStyle.color = theme['text-primary-color'];
      status = ButtonStatusEnum.ended;
      isDisabled = false;
      break;
    }
    case PRODUCT_STATUS_ENUM.ERROR: {
      buttonText = '錯誤';
      status = ButtonStatusEnum.error;
      isDisabled = false;
      break;
    }
    default: {
      buttonText = label ? label : PRODUCT_STATUS_ENUM.NONE.toString();
      tmpStyle.backgroundColor = theme['color-primary-disabled'];
      tmpStyle.borderColor = theme['color-primary-disabled'];
      status = ButtonStatusEnum.disabled;
      isDisabled = true;
    }
  }
  const productStatusButtonStyle = StyleSheet.create({ button: tmpStyle });
  const overallStyle = StyleSheet.compose(
    customStyle,
    productStatusButtonStyle.button,
  );
  return (
    <Button.Oval
      style={overallStyle}
      status={status}
      disabled={isDisabled}
      label={buttonText}
      {...props}
    />
  );
};
