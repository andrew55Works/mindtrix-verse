import { ToastAndroid } from 'react-native';
import { FC } from 'react';

interface Props {
  visible: boolean;
  message: string;
}
const Toast: FC<Props> = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    return null;
  }
  return null;
};

export default Toast;
