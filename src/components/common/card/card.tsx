import { default as React } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import * as UIKitten from '@ui-kitten/components';
import theme from '../../../styles/eva-styled-system.json';
import { CardProps } from '@ui-kitten/components/ui/card/card.component';

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme['text-secondary-color'],
    padding: 24,
    width: 732,
    minHeight: 600,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowRadius: 2,
    borderColor: theme['system-bg-gray-500'],
    borderWidth: 2,
  },
});

export const DefaultCard = ({
  children,
  style: styleProps,
  ...props
}: CardProps) => {
  const cardStyle = StyleSheet.compose(
    styles.card as StyleProp<ViewStyle>,
    styleProps,
  );
  return (
    <UIKitten.Card {...props} style={cardStyle}>
      {children}
    </UIKitten.Card>
  );
};
