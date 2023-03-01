import React, { useState } from 'react';
import { checkVideoFileValid } from '../../../utils/file.utils';

export const useHandleWebFileInput = () => {
  const [file, setFile] = useState<File | null>(null);
  const loadFileToState = (files: Array<File> | null) => {
    const isFileExist = !!files && files.length > 0;
    const fileTmp = isFileExist ? files[0] : null;
    const isVideoFileValid = checkVideoFileValid(fileTmp);
    if (!isVideoFileValid) {
      console.warn('file cannot be null!');
      setFile(null);
    } else {
      setFile(fileTmp);
    }
  };
  return { file, loadFileToState };
};

export const useHandleImageFileInput = () => {
  const [file, setFile] = useState<File | null>(null);
  const loadFileToState = (files: Array<File> | null) => {
    const isFileExist = !!files && files.length > 0;
    const fileTmp = isFileExist ? files[0] : null;
    setFile(fileTmp);
  };
  const customImgUrl = React.useMemo(
    () => (!!file ? URL.createObjectURL(file) : ''),
    [file],
  );
  const clearImageFiles = () => setFile(null);
  return { file, customImgUrl, clearImageFiles, loadFileToState, setFile };
};
