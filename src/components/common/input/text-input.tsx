import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import * as UIKitten from '@ui-kitten/components';
import { StyledProps } from 'styled-components';

const styles = StyleSheet.create({
  input: { marginVertical: 0 },
});

export const TextInput = ({
  style: styleProps,
  ...props
}: UIKitten.InputProps) => {
  const inputStyle = StyleSheet.compose(
    styles.input as StyledProps<TextStyle>,
    styleProps,
  );
  return <UIKitten.Input style={inputStyle} {...props} />;
};
