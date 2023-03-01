import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import MindtrixLogoSVG from '../../assets/mindtrix-logo.svg';

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    backgroundColor: '#6D6D6D',
    borderRadius: 20,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowRadius: 4,
    shadowOpacity: 0.3,
    height: 180,
    width: 180,
    elevation: 20,
    margin: 16,
  },
});

export const RoundedLogo = () => (
  <View style={styles.container}>
    <MindtrixLogoSVG height={200} width={200} />
  </View>
);
