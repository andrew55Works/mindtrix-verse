import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import * as UIKitten from '@ui-kitten/components';

const styles = StyleSheet.create({
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    paddingLeft: 16,
    marginTop: 8,
    fontSize: 12,
    fontWeight: '400',
    color: '#8F9BB3',
  },
  text: {},
  container: { marginVertical: 16 },
});

const AlertIcon = (iconProps: any) => (
  <UIKitten.Icon {...iconProps} name='alert-circle-outline' />
);

export const PasswordInput = (props: UIKitten.InputProps) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const text = {
    caption: '請輸入8-12位密碼',
  };

  const renderIcon = (iconProps: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <UIKitten.Icon
        {...iconProps}
        name={secureTextEntry ? 'eye-off' : 'eye'}
      />
    </TouchableWithoutFeedback>
  );

  const renderCaption = () => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <UIKitten.Text style={styles.captionText}>{text.caption}</UIKitten.Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <UIKitten.Input
        style={styles.text}
        // caption={renderCaption}
        // accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        {...props}
      />
    </View>
  );
};
