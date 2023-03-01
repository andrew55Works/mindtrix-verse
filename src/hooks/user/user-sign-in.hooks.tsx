import { useGoogle } from '../google/google.hooks';
import { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../screens/screen.interface';
import { StackActions } from '@react-navigation/native';

type Props = StackScreenProps<RootStackParamList, 'Init'>;
export const useCheckIsUserSignInAndIntent = ({ navigation }: Props) => {
  const { isGoogleSignIn, googleUserInfo } = useGoogle();
  useEffect(() => {
    const isSignIn = isGoogleSignIn;
    if (isSignIn) {
      navigation.dispatch(
        StackActions.replace('Main', { userInfo: googleUserInfo }),
      );
    } else {
      navigation.dispatch(StackActions.replace('SignIn'));
    }
  }, [googleUserInfo, isGoogleSignIn, navigation]);
};

export const useCheckIsUserSign = () => {
  const { isGoogleSignIn, googleUserInfo } = useGoogle();
  return { isGoogleSignIn, googleUserInfo };
};
