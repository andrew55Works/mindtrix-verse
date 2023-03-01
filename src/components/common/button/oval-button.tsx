import React from 'react';
import { ButtonProps, default as Button } from './index';
import { StyleSheet } from 'react-native';

export const OvalButton = ({ style: customStyle, ...props }: ButtonProps) => {
  const ovalButtonStyle = StyleSheet.create({
    button: {
      borderRadius: 20,
    },
  });
  const overallStyle = StyleSheet.compose(customStyle, ovalButtonStyle.button);
  return <Button.Square style={overallStyle} {...props} />;
};
