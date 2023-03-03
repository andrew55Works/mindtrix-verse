import { default as React, FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProductTypeEnum } from '../navigation/index';
import theme from '../../styles/eva-styled-system.json';
import { TopNavigation } from '../navigation/top-navigation.component';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: theme['text-secondary-color'],
    width: '100%',
  },
  subContainer: {
    minHeight: '100vh',
  },
  drawerAndContent: {
    backgroundColor: theme['text-secondary-color'],
    flexDirection: 'row',
    width: '100%',
    flex: 1,
  },
  content: {
    padding: 24,
    flex: 1,
    flexShrink: 1,
  },
});

interface Props {
  productType?: ProductTypeEnum;
}
export const PageLayout: FC<Props> = ({
  children,
  productType = ProductTypeEnum.Creator,
}) => {
  // useBrowserLocale();
  const TopNav = () => (
    <TopNavigation productTitle={'Mindtrix'} productType={productType} />
  );
  return (
    <div
      style={{ backgroundColor: theme['text-secondary-color'], width: '100%' }}
    >
      <View style={styles.subContainer}>
        <View>{TopNav()}</View>
      </View>
    </div>
  );
};
