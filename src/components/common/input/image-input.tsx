import React, { FC, useRef } from 'react';
import { GestureResponderEvent } from 'react-native';
import { fileListToArray } from '../../../utils/file.utils';
import { useCreatorCreateI18n } from '../../../hooks/i18n/i18n.hooks';
import { Button } from '../../../styles/styled-system/button.theme';

interface Props {
  fileHandler: (
    files: Array<File> | null,
    iterableFile: Iterable<File> | null,
  ) => void;
}

export const ImageInput: FC<Props> = ({ fileHandler }) => {
  const { text } = useCreatorCreateI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const onPress = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isRefExist = !!(inputRef?.current ?? null);
    if (!isRefExist) throw new Error('The file input cannot be empty!');
    inputRef?.current?.click();
  };

  const onFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    const iterableFiles = e?.target?.files as Iterable<File>;
    if (!files) {
      fileHandler(null, null);
      return;
    }
    const filesArray = fileListToArray(files);
    fileHandler(filesArray, iterableFiles);
  };

  return (
    <>
      <input
        type='file'
        style={webStyles.fileInput}
        id='file-uploader'
        data-target='file-uploader'
        accept='image/*'
        onChange={onFileChanged}
        ref={inputRef}
      />
      <Button.Square
        status={'secondary'}
        appearance={'filled'}
        size={'medium'}
        children={text.h4_upload_image}
        onClick={onPress}
        marginLeft={0}
      />
    </>
  );
};

const webStyles = {
  fileInput: {
    display: 'none',
  },
};

ImageInput.displayName = 'ImageInput';
export default ImageInput;
