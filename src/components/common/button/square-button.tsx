import React from 'react';
import * as UIKitten from '@ui-kitten/components';
import {
  ButtonAppearanceEnum,
  ButtonProps,
  ButtonSizeEnum,
  LoadingIndicator,
} from './index';
import { StyleSheet } from 'react-native';

export const SquareButton = ({
  isShow = true,
  isShowLeftPlusIcon,
  isShowRightPlusIcon,
  appearance = ButtonAppearanceEnum.filled,
  backgroundColor,
  disabled = false,
  label,
  onClick,
  size = ButtonSizeEnum.medium,
  status,
  style: customStyle,
  ...props
}: ButtonProps) => {
  if (!isShow) return null;
  const isLoading = status === 'loading';
  const isDisabled = disabled || isLoading;
  const backgroundColorStyle =
    status === 'custom'
      ? {
          backgroundColor,
        }
      : {};
  const cursorStyle = isDisabled
    ? {
        cursor: 'not-allowed',
      }
    : {};
  const finalStatus = isDisabled ? 'disabled' : status;

  const buttonStyle = StyleSheet.create({
    button: {
      alignSelf: 'flex-start',
      margin: 4,
      ...backgroundColorStyle,
      ...cursorStyle,
    },
  });

  const overallStyle = StyleSheet.compose(customStyle, buttonStyle.button);

  const AccessoryLeftComponent = isLoading ? (
    <LoadingIndicator size={size} />
  ) : isShowLeftPlusIcon ? (
    <UIKitten.Icon name={'plus-outline'} />
  ) : undefined;
  const AccessoryRightComponent = isShowRightPlusIcon ? (
    <UIKitten.Icon name={'plus-outline'} />
  ) : undefined;

  return (
    <UIKitten.Button
      appearance={appearance}
      size={size}
      status={finalStatus}
      disabled={isDisabled}
      style={overallStyle}
      accessoryLeft={AccessoryLeftComponent}
      accessoryRight={AccessoryRightComponent}
      onPress={isDisabled ? undefined : onClick}
      {...props}
    >
      {label}
    </UIKitten.Button>
  );
};
