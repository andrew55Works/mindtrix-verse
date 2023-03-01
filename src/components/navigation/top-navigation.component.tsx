import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../styles/styled-system/button.theme';
import theme from '../../styles/eva-styled-system.json';
import { ProductTypeEnum } from './index';
import { useCreatorCommonI18n } from '../../hooks/i18n/i18n.hooks';
import Avatar from '../user/avatar';
import * as Comp from '../../types/component-status.type';
import { STATUS_ENUM } from '../../types/component-status.type';
import { AnimatedText } from '../common/text/text';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
  selectCreatorProfile,
  selectIsCreatorSignIn,
} from '../../redux/creator/creator.selector';
import { PAGE_URL } from '../../utils/page-router.utils';
import { useIsMobileLayout } from '../../hooks/window/resize.hooks';
import { Hamburger } from './hamburger';
import { CreatorsLogo } from './creators-logo';

export interface Image {
  height: number | undefined;
  url: string | undefined;
  width: number | undefined;
}

export interface Images {
  large: Image;
  medium: Image;
  small: Image;
}

export const imageDefaultState: Image = {
  height: undefined,
  url: undefined,
  width: undefined,
};

export const imagesDefaultState = {
  large: imageDefaultState,
  medium: imageDefaultState,
  small: imageDefaultState,
};

interface TopNavigationProps {
  backgroundColor?: string;
  productTitle: string;
  productType: ProductTypeEnum;
}

export const TopNavigation = (props: TopNavigationProps) => {
  const [CompStatus, setCompStatus] = React.useState(Comp.STATUS_ENUM.LOADED);
  const backgroundColor = props?.backgroundColor ?? theme['system-bg-gray-500'];
  const creatorProfile = useSelector(selectCreatorProfile);
  const name = creatorProfile?.name ?? '';
  const avatarUrl = creatorProfile?.images?.small?.url ?? '';
  const { text: textCreatorCommon } = useCreatorCommonI18n();
  const router = useRouter();
  const { isMobileLayout } = useIsMobileLayout();
  const isSignedIn = useSelector(selectIsCreatorSignIn);

  // console.info('isCreatorProductType:', isCreatorProductType);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 10,
      height: '100%',
      backgroundColor,
    },
    titleContainer: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 44,
    },
    productSubTitle: {
      alignItems: 'center',
      borderLeftWidth: 2,
      borderLeftColor: theme['color-primary-900'],
      color: theme['text-black-color'],
      paddingLeft: 24,
      height: 24,
      marginLeft: 24,
      letterSpacing: 0.2,
    },
    menuContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'row',
      flexShrink: 1,
    },
    userAvatar: {
      width: 44,
      height: 44,
      marginHorizontal: 12,
    },
    userName: {
      color: theme['text-black-color-400'],
      fontWeight: '600',
      marginHorizontal: 12,
    },
  });

  const renderTitle = () => (
    <View style={styles.titleContainer}>
      <View>
        <CreatorsLogo isWhiteStyle={false} />
      </View>
      <View style={styles.menuContainer}>
        {isMobileLayout ? null : name ? (
          <>
            <Avatar
              uri={avatarUrl}
              status={STATUS_ENUM.LOADED}
              height={44}
              width={44}
              marginHorizontal={12}
              marginVertical={0}
            />
            <div
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              <AnimatedText
                fontSize={16}
                value={name}
                status={CompStatus}
                x={16}
                y={5}
              />
            </div>
          </>
        ) : null}
        {isSignedIn ? (
          <Button.Square
            appearance={'filled'}
            status={'secondary'}
            size={'large'}
            backgroundColor={'rgb(26, 33, 56)'}
            marginTop={0}
            marginRight={3}
            marginBottom={0}
            marginLeft={3}
            onClick={() => router.push(PAGE_URL.creators_account)}
            children={textCreatorCommon.top_navigation_button_account_setting}
          />
        ) : null}
        <Hamburger isShow={isSignedIn && isMobileLayout} />
      </View>
    </View>
  );

  return <View style={styles.container}>{renderTitle()}</View>;
};
