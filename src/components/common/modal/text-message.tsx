import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as UIKitten from '@ui-kitten/components';
import Button, { ButtonAppearanceEnum, ButtonStatusEnum } from '../button';

export interface ModalProps extends UIKitten.ModalProps {
  onClick: {
    confirmFn: () => void;
    dismissFn: () => void;
  };
  style?: {
    width?: number;
  };
  text: {
    content: string;
    leftButton: string;
    rightButton: string;
    title: string;
  };
}

export const TextMessage = (props: ModalProps) => {
  const {
    onClick: { confirmFn, dismissFn },
    visible = false,
  } = props;
  const { content, title, leftButton, rightButton } = props.text;
  const width = props?.style?.width ?? 490;
  const styles = StyleSheet.create({
    container: {
      display: visible ? 'flex' : 'none',
      minHeight: 206,
      width,
    },
    content: {
      width,
    },
    title: {
      width,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    footerButtonContainer: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  });

  const LeftButton = () =>
    leftButton ? (
      <Button.Square
        onClick={dismissFn}
        label={leftButton}
        status={ButtonStatusEnum.control}
      />
    ) : null;
  const RightButton = () =>
    rightButton ? (
      <Button.Square
        onClick={confirmFn}
        label={rightButton}
        status={ButtonStatusEnum.secondary}
        appearance={ButtonAppearanceEnum.ghost}
      />
    ) : null;
  return (
    <View style={styles.container}>
      <UIKitten.Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={dismissFn}
      >
        <UIKitten.Card disabled={true}>
          <UIKitten.Text category={'h3'} style={styles.title}>
            {title}
          </UIKitten.Text>
          <UIKitten.Text category={'h6'} style={styles.content}>
            {content}
          </UIKitten.Text>
          <View style={styles.footerButtonContainer}>
            <LeftButton />
            <RightButton />
          </View>
        </UIKitten.Card>
      </UIKitten.Modal>
    </View>
  );
};
