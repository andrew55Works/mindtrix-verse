import { FIREBASE_AUTH } from './firebase-client';
import { User } from '@firebase/auth';
import { getFrontendMindtrixWebDomain } from '../../utils/config.web.utils';
import { PAGE_URL } from '../../utils/page-router.utils';
import { GoogleAuthProvider } from 'firebase/auth';
import { FirebaseError } from '@firebase/util';

const auth = FIREBASE_AUTH.getAuth();
const googleAuthProvider = new GoogleAuthProvider();
export const FirebaseAuth = {
  logout: async () => {
    return auth.signOut();
  },
  getCurrentUser: async () => {
    return auth.currentUser;
  },
  signInWithPopup: async (): Promise<{
    googleAccessToken: string | null;
    googleUser: User | null;
  }> => {
    try {
      const authInfo = await FIREBASE_AUTH.signInWithPopup(
        auth,
        googleAuthProvider,
      );
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(authInfo);
      const googleAccessToken = credential?.accessToken ?? '';
      const googleUser = authInfo.user;
      return { googleAccessToken, googleUser };
      // IdP data available using getAdditionalUserInfo(authInfo)
    } catch (e) {
      const error = e as FirebaseError;
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error?.customData?.email ?? '';
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error('Google Auth error:', errorMessage);
      return { googleAccessToken: null, googleUser: null };
    }
  },
  signInUserWithEmailAndPassword: async (
    email: string,
    password: string,
  ): Promise<{ error?: string; user: User | null }> => {
    try {
      const userCred = await FIREBASE_AUTH.signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return {
        user: userCred.user,
      };
    } catch (e: any) {
      return {
        user: null,
        error: e.message,
      };
    }
  },
  createUserWithEmailAndPassword: async (
    email: string,
    password: string,
    verification_hash: string,
    rss_link: string,
    isResend: boolean,
  ) => {
    try {
      const mindtrixWebDomain = getFrontendMindtrixWebDomain();
      const currentUser = await FirebaseAuth.getCurrentUser();
      const user = (
        isResend
          ? currentUser
            ? currentUser
            : await FirebaseAuth.signInUserWithEmailAndPassword(email, password)
          : (
              await FIREBASE_AUTH.createUserWithEmailAndPassword(
                auth,
                email,
                password,
              )
            )?.user ?? null
      ) as User;
      const emailBase64 = Buffer.from(email).toString('base64');
      const rssBase64 = Buffer.from(rss_link).toString('base64');
      const redirectUrl = `${mindtrixWebDomain}/verify/creator/email-verified?v=${verification_hash}&e=${emailBase64}&r=${rssBase64}`;
      const actionCodeSettings = {
        url: redirectUrl,
      };
      await FIREBASE_AUTH.sendEmailVerification(user, actionCodeSettings);
      return {
        user,
      };
    } catch (e: any) {
      console.error('sendEmailVerification error:', e);
      return {
        error: e?.message ?? null,
      };
    }
  },
  resetPassword: async (
    email: string,
    rss_link: string,
    verification_hash: string,
  ) => {
    try {
      const mindtrixWebDomain = getFrontendMindtrixWebDomain();
      const emailBase64 = Buffer.from(email).toString('base64');
      const rssBase64 = Buffer.from(rss_link).toString('base64');
      const redirectUrl = `${mindtrixWebDomain}${PAGE_URL.creators_reset_password}?v=${verification_hash}&e=${emailBase64}&r=${rssBase64}`;
      const actionCodeSettings = {
        url: redirectUrl,
        handleCodeInApp: true,
      };

      await FIREBASE_AUTH.sendSignInLinkToEmail(
        auth,
        email,
        actionCodeSettings,
      );
    } catch (e: any) {
      console.error('resetPassword error.code:', e.code);
      console.error('resetPassword error.message:', e.message);
    }
  },
  deleteAccount: async () => {
    try {
      const user = auth.currentUser as User;
      if (!user) {
        console.error(
          'Cannot delete the password whose user did not sign in Firebase.',
        );
      }
      await FIREBASE_AUTH.deleteUser(user);
    } catch (e: any) {
      return e.message;
    }
  },
  updatePassword: async (newPassword: string) => {
    try {
      const user = auth.currentUser as User;
      if (!user) {
        console.error(
          'Cannot update the password whose user did not sign in Firebase.',
        );
      }
      await FIREBASE_AUTH.updatePassword(user, newPassword);
      return 'Update successfully';
    } catch (e: any) {
      return e.message;
    }
  },
};
