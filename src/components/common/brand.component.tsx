import { SafeAreaView, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { RoundedLogo } from './image.component';
import React, { FC } from 'react';

const Brand: FC<any> = () => {
  const styles = StyleSheet.create({
    container: {
      height: '100%',
    },
    layout: {
      backgroundColor: '#FFF',
      height: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        <RoundedLogo />
        <Text
          style={{
            color: '#000',
            letterSpacing: 8,
            fontSize: 40,
            fontWeight: '500',
            marginBottom: 37,
          }}
        >
          Mindtrix
        </Text>
      </Layout>
    </SafeAreaView>
  );
};

Brand.displayName = 'Brand';
export default Brand;
