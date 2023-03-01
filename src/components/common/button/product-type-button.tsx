import {
  ButtonAppearanceEnum,
  ButtonProps,
  ButtonStatusEnum,
  default as Button,
} from './index';
import { StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '@ui-kitten/components';

export enum PRODUCT_TYPE_ENUM {
  AUDIO = 'AUDIO',
  IMAGE = 'IMAGE',
  LITERATURE = 'LITERATURE',
  VIDEO = 'VIDEO',
}

export interface ProductTypeButtonProps extends ButtonProps {
  productType: PRODUCT_TYPE_ENUM;
}

export const ProductTypeButton = ({
  style: customStyle,
  productType,
  label,
  ...props
}: ProductTypeButtonProps) => {
  const theme = useTheme();
  if (!theme) return null;
  let buttonText;
  switch (productType) {
    case PRODUCT_TYPE_ENUM.AUDIO: {
      buttonText = '段落';
      break;
    }
    case PRODUCT_TYPE_ENUM.IMAGE: {
      buttonText = '封面';
      break;
    }
    case PRODUCT_TYPE_ENUM.VIDEO: {
      buttonText = '影視';
      break;
    }
    case PRODUCT_TYPE_ENUM.LITERATURE: {
      buttonText = '文章';
      break;
    }
    default: {
      buttonText = label;
      break;
    }
  }
  const productStatusButtonStyle = StyleSheet.create({
    button: {
      backgroundColor: 'transparent',
      borderColor: theme['color-primary-500'],
      color: 'black',
    },
  });
  // const overallStyle = StyleSheet.compose(
  //   customStyle,
  //   productStatusButtonStyle.button,
  // );
  return (
    <Button.Oval
      appearance={ButtonAppearanceEnum.ghost}
      style={productStatusButtonStyle.button}
      label={buttonText}
      {...props}
    />
  );
};
