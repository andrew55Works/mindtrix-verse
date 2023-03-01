export const fileListToArray = (list: FileList) => {
  const array: Array<File> = [];
  for (let i = 0; i < list.length; i++) {
    const file = list.item(i) as File;
    array.push(file);
  }
  return array;
};

export const audioValidExtensions = ['.mp3', '.aac', '.wav', '.flac', '.ape'];

export const checkIsFileExtAccepted = (
  file: File,
  validExtensions: Array<string>,
): boolean => {
  if (!!!file || !!!validExtensions) return false;
  const fileExt = '.' + (file?.name?.split('.')?.pop()?.toLowerCase() ?? '');
  if (validExtensions.indexOf(fileExt) < 0) {
    alert('檔案類型錯誤，可接受副檔名有：' + validExtensions.toString());
    return false;
  } else {
    return true;
  }
};

// 1024 * 1024 * 1000 留點空間避免檔案計算誤差
const GB = 1024 * 1024 * 1000;
export const maximumVimeoVideoBytes = 10 * GB;
export const maximumCsvBytes = 1 * GB;

export const checkIsFileOverMaximum = (
  fileTotalBytes: number,
  fileMaximumBytes: number,
) => {
  if (fileTotalBytes >= fileMaximumBytes) {
    alert('file size too large! The maximum of file size is 10 GB.');
    return true;
  }
  return false;
};

export const getFileChunkSize = (file: File): number => {
  let chunkSize = 0;
  try {
    chunkSize = parseInt(file.size.toString(), 10);
  } catch (e) {
    console.error('getFileChunkSize error:', e);
  }
  return chunkSize;
};

export const checkVideoFileValid = (file: File | null) => {
  const isFileExist = !!file;
  if (!isFileExist) return false;
  const checkedFile = file as File;
  const isExtAccepted = checkIsFileExtAccepted(
    checkedFile,
    audioValidExtensions,
  );
  if (!isExtAccepted) return false;
  const isFileOverMaximum = checkIsFileOverMaximum(
    getFileChunkSize(checkedFile),
    maximumVimeoVideoBytes,
  );
  return !isFileOverMaximum;
};
