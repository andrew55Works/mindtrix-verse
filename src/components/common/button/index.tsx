import { SquareButton } from './square-button';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import _get from 'lodash.get';
import * as UIKitten from '@ui-kitten/components';
import React from 'react';
import { OvalButton } from './oval-button';
import { ProductStatusButton } from './product-status-button';
import { ProductTypeButton } from './product-type-button';
import {
  FacebookButton,
  GoogleButton,
  SpotifyButton,
  TwitterButton,
} from './sso-button';

export enum ButtonAppearanceEnum {
  'filled' = 'filled',
  'outline' = 'outline',
  'ghost' = 'ghost',
}

export enum ButtonStatusEnum {
  'disabled' = 'disabled',
  'primary' = 'primary',
  'secondary' = 'secondary',
  'drawer' = 'drawer',
  'draft' = 'draft',
  'ended' = 'ended',
  'error' = 'error',
  'success' = 'success',
  'info' = 'info',
  'warning' = 'warning',
  'danger' = 'danger',
  'basic' = 'basic',
  'control' = 'control',
  'loading' = 'loading',
  'custom' = 'custom',
}

export enum ButtonSizeEnum {
  'tiny' = 'tiny',
  'small' = 'small',
  'medium' = 'medium',
  'large' = 'large',
  'giant' = 'giant',
}

export interface ButtonProps
  extends Pick<UIKitten.ButtonProps, 'accessoryLeft' | 'accessoryRight'> {
  appearance?: ButtonAppearanceEnum;
  backgroundColor?: string;
  disabled?: boolean;
  isShow?: boolean;
  isShowLeftPlusIcon?: boolean;
  isShowRightPlusIcon?: boolean;
  label: string;
  onClick?: (event: GestureResponderEvent) => void;
  size?: ButtonSizeEnum;
  status?: ButtonStatusEnum;
  style?: StyleProp<ViewStyle> | undefined;
}

const styles = StyleSheet.create({
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const LoadingIndicator = ({ size }: { size: ButtonSizeEnum }) => {
  const spinnerSizeArray = Object.keys(ButtonSizeEnum);
  const spinnerSizeObj = spinnerSizeArray.reduce((acc, cur, index) => {
    const obj = JSON.parse(JSON.stringify(acc));
    obj[cur] = index - 1 >= 0 ? index - 1 : 0;
    return obj;
  }, {});
  const fixedSpinnerSize = _get(
    spinnerSizeArray,
    [_get(spinnerSizeObj, [size], ButtonSizeEnum.tiny)],
    0,
  ) as ButtonSizeEnum;
  return (
    <View style={styles.indicator}>
      <UIKitten.Spinner size={fixedSpinnerSize} status={'control'} />
    </View>
  );
};

const Button = {
  Square: SquareButton,
  Oval: OvalButton,
  ProductStatus: ProductStatusButton,
  ProductType: ProductTypeButton,
  SSO: {
    SpotifyButton,
    FacebookButton,
    GoogleButton,
    TwitterButton,
  },
};
export default Button;
export type ButtonShapeType = typeof SquareButton | typeof OvalButton;
export type ButtonProductType =
  | typeof ProductStatusButton
  | typeof ProductTypeButton;

export type ButtonSsoType =
  | typeof SpotifyButton
  | typeof FacebookButton
  | typeof GoogleButton
  | typeof TwitterButton;
