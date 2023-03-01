import React from 'react';
import { ButtonProps, StyleSheet } from 'react-native';
import { Button } from '@ui-kitten/components';
import FacebookSVG from '../../../assets/icons/icon_facebook_small.svg';
import GoogleSVG from '../../../assets/icons/icon_google_small.svg';
import SpotifySVG from '../../svg/icon_spotify.svg';
import TwitterSVG from '../../../assets/icons/icon_twitter.svg';
import { ButtonSizeEnum } from './index';

const styles = StyleSheet.create({
  spotify: {
    alignSelf: 'flex-start',
    border: 0,
    borderRadius: 40,
    height: 60,
    padding: 4,
    margin: 4,
    minWidth: 324,
    backgroundColor: '#1db954',
  },
  spotifyText: {
    fontSize: 24,
  },
  facebook: {
    alignSelf: 'flex-start',
    border: 0,
    borderRadius: 40,
    height: 60,
    padding: 4,
    margin: 4,
    minWidth: 324,
    backgroundColor: '#1877f2',
  },
  facebookText: {
    fontSize: 24,
  },
  twitter: {
    alignSelf: 'flex-start',
    color: '#ffffff',
    borderColor: '#3FA9F5',
    borderRadius: 40,
    height: 60,
    padding: 4,
    margin: 4,
    minWidth: 324,
    backgroundColor: '#3FA9F5',
  },
  google: {
    alignSelf: 'flex-start',
    borderColor: '#000000',
    borderRadius: 40,
    height: 60,
    padding: 4,
    margin: 4,
    minWidth: 324,
    backgroundColor: '#ffffff',
  },
  googleText: {
    textColor: '#000000',
    fontSize: 24,
  },
});

const SpotifyIcon = () => (
  <div style={{ height: 'auto', width: 'auto' }}>
    <SpotifySVG />
  </div>
);

const FacebookIcon = () => (
  <div style={{ height: 'auto', width: 'auto' }}>
    <FacebookSVG />
  </div>
);

const GoogleIcon = () => (
  <div style={{ height: 'auto', width: 'auto' }}>
    <GoogleSVG />
  </div>
);

const TwitterIcon = () => (
  <div style={{ height: 'auto', width: 'auto' }}>
    <TwitterSVG />
  </div>
);

export const SpotifyButton = (props: ButtonProps) => (
  <Button
    style={styles.spotify}
    appearance='sso'
    status='primary'
    accessoryLeft={<SpotifyIcon />}
    size={ButtonSizeEnum.giant}
  >
    Login with Spotify
  </Button>
);

export const FacebookButton = (props: ButtonProps) => (
  <Button
    style={styles.facebook}
    appearance='sso'
    status='primary'
    accessoryLeft={<FacebookIcon />}
    size={ButtonSizeEnum.giant}
  >
    Login with Facebook
  </Button>
);

export const GoogleButton = (props: ButtonProps) => (
  <Button
    style={styles.google}
    appearance='sso'
    status='secondary'
    accessoryLeft={<GoogleIcon />}
    size={ButtonSizeEnum.giant}
  >
    Login with Google
  </Button>
);

export const TwitterButton = (props: ButtonProps) => (
  <Button
    style={styles.twitter}
    appearance='sso'
    status='secondary'
    accessoryLeft={<TwitterIcon />}
    size={ButtonSizeEnum.giant}
  >
    {props?.title ?? '' ? props.title : 'Login with Twitter'}
  </Button>
);
