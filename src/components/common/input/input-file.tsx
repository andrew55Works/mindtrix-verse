import { default as React, FC, useRef } from 'react';
import { GestureResponderEvent, StyleSheet } from 'react-native';
import { Button } from '@ui-kitten/components';
import { fileListToArray } from '../../../utils/file.utils';

interface Props {
  fileHandler: (
    files: Array<File> | null,
    iterableFile: Iterable<File> | null,
  ) => void;
}
const FileInput: FC<Props> = ({ fileHandler }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onPress = (e: GestureResponderEvent) => {
    e.preventDefault();
    const isRefExist = !!(inputRef?.current ?? null);
    if (!isRefExist) throw new Error('The file input cannot be empty!');
    inputRef?.current?.click();
  };

  const onFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    const iterableFiles = e.target.files as Iterable<File>;
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
        accept='audio/*'
        onChange={onFileChanged}
        ref={inputRef}
      />
      <Button style={nativeStyles.selectFileButton} onPress={onPress}>
        Select File
      </Button>
    </>
  );
};
const nativeStyles = StyleSheet.create({
  selectFileButton: {
    marginVertical: 16,
  },
});
const webStyles = {
  fileInput: {
    display: 'none',
  },
};

FileInput.displayName = 'FileInput';
export default FileInput;
