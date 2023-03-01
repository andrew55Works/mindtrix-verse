import React, { useEffect, useState } from 'react';
import { generateKey } from '../../utils/keys.utils';
import { Audio } from '../../types/recorder';
import { deleteAudio } from './recordings-list';
import { _cloneDeep } from '../../utils/lodash.utils';
import { FirebaseStorage } from '../../services/firebase/storage';

export default function useRecordingsList(
  audio: string | null,
  file: File,
  files: Array<File>,
  setFiles: React.Dispatch<Array<File>>,
) {
  const [recordings, setRecordings] = useState<Array<Audio>>([]);

  useEffect(() => {
    if (audio) {
      // setFiles(())
      const orgFiles = _cloneDeep(files);
      orgFiles.push(file);
      setFiles(orgFiles);
      setRecordings((prevState: Array<Audio>) => {
        return [...prevState, { key: generateKey(), audio, file }];
      });
    }
  }, [audio]);

  return {
    recordings,
    deleteAudio: (audioKey: string) => deleteAudio(audioKey, setRecordings),
  };
}

export const useFirebaseStorageList = (
  setIsLoading: React.Dispatch<boolean>,
) => {
  const [questionAudioURL, setQuestionAudioURL] = useState('');
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const latestAudioURL = await FirebaseStorage.getTheLatestAudioURL();
      setQuestionAudioURL(latestAudioURL);
      setIsLoading(false);
    };
    fetch();
  }, []);
  return {
    questionAudioURL,
  };
};
