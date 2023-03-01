import React, { useEffect, useState } from 'react';
import { Button } from '@ui-kitten/components';
import * as fcl from '@onflow/fcl';
import { CurrentUserObject } from '@onflow/fcl';
import { GestureResponderEvent } from 'react-native';
import { Text } from '../../styles/styled-system/text.theme';

const SignInOutButton = ({ user: { loggedIn = false } }) => {
  const signInOrOut = async (e: GestureResponderEvent) => {
    e.preventDefault();
    if (loggedIn) {
      fcl.unauthenticate();
    } else {
      fcl.authenticate();
    }
  };

  return (
    <Button onPress={signInOrOut}>
      {loggedIn ? 'Sign Out FLOW Wallet' : 'Sign In/Up FLOW Wallet'}
    </Button>
  );
};
interface BloctoUserInfo {
  addr: string;
  loggedIn: boolean | undefined;
}
const BloctoSSO = () => {
  const [user, setUser] = useState<CurrentUserObject>({
    addr: '',
    loggedIn: false,
    cid: '',
    expiresAt: 0,
    f_type: '',
    f_vsn: '',
    services: [],
  });
  // const { loggedIn } = user;
  // useEffect(() => {
  //   if (!loggedIn) {
  //     fcl.authenticate();
  //   }
  // }, [loggedIn]);
  useEffect(() => fcl.currentUser.subscribe((user) => setUser(user)), []);

  return (
    <div>
      <Text.h1 status={'basic'} children={`wallet addr: ${user?.addr}`} />
      <br />
      <SignInOutButton user={user} />
    </div>
  );
};
export default BloctoSSO;
