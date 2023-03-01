import React, { FC } from 'react';
import * as UIKitten from '@ui-kitten/components';
import { ImageURISource, StyleSheet } from 'react-native';
import * as Comp from '../../types/component-status.type';

interface AvatarProps extends Comp.IStatus {
  height: number;
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  shape?: 'round' | 'rounded' | 'square' | string;
  uri: string;
  width: number;
}

const Avatar: FC<AvatarProps> = ({
  uri,
  status,
  height,
  shape = 'round',
  width,
  margin = 0,
  marginHorizontal = margin,
  marginVertical = margin,
}) => {
  const source: ImageURISource = {
    uri,
    width,
    height,
  };
  const styles = StyleSheet.create({
    avatar: {
      width,
      height,
      marginHorizontal,
      marginVertical,
    },
  });
  const isDataExist = !!uri;
  if (isDataExist && status === Comp.STATUS_ENUM.LOADED) {
    return (
      <UIKitten.Avatar
        style={styles.avatar}
        shape={shape}
        progressiveRenderingEnabled={true}
        source={source}
      />
    );
  } else {
    return null;
  }
};

export default Avatar;
