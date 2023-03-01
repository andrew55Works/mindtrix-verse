import { ref, uploadBytes, getDownloadURL, list } from 'firebase/storage';
import { FIREBASE_STORAGE } from './firebase-client';

const audioPath = 'public/0102-marathonstorytellerpodcast-poap-nft';
export const FirebaseStorage = {
  uploadImg: async (
    fileNameWithExtension: string,
    file: File,
  ): Promise<string> => {
    // Create a reference to 'mountains.jpg'
    const storageRef = ref(
      FIREBASE_STORAGE,
      `public/essence/images/${fileNameWithExtension}`,
    );
    try {
      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    } catch (e) {
      console.error('uploadImg error:', e);
      return '';
    }
  },
  uploadAudio: async (
    GlobalAudioContext: any,
    fileNameWithExtension: string,
    file: File,
  ): Promise<string> => {
    const metadata = {
      contentType: 'audio/mp3',
    };
    const storageRef = ref(
      FIREBASE_STORAGE,
      `${audioPath}/${fileNameWithExtension}`,
    );
    try {
      const snapshot = await uploadBytes(
        storageRef,
        await file.arrayBuffer(),
        metadata,
      );
      return await getDownloadURL(snapshot.ref);
    } catch (e) {
      console.error('uploadImg error:', e);
      return '';
    }
  },
  getTheLatestAudioURL: async (): Promise<string> => {
    // Fetch the first page of 100.
    const listRef = ref(FIREBASE_STORAGE, audioPath);
    const firstPage = await list(listRef, { maxResults: 1000 });
    const len = firstPage?.items?.length ?? 0;
    if (len > 0) {
      const fullPath = firstPage?.items[len - 1].fullPath;
      const storageRef = ref(FIREBASE_STORAGE, fullPath);
      return await getDownloadURL(storageRef);
    }
    return '';
  },
};
