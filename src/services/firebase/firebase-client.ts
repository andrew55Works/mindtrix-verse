import { initializeApp } from 'firebase/app';
import * as auth from 'firebase/auth';
import { getFirebaseConfig } from '../../utils/config.web.utils';
import { getStorage } from 'firebase/storage';

const firebaseConfig = getFirebaseConfig();
initializeApp(firebaseConfig);

const FIREBASE_AUTH = auth;
const FIREBASE_STORAGE = getStorage();

export { FIREBASE_AUTH, FIREBASE_STORAGE };
