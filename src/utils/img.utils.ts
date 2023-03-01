const covertImgUrlToBlob = (
  url: string,
): Promise<string | ArrayBuffer | null> =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }),
    );

const dataURLtoFile = (dataUrl: string, filename: string) => {
  if (!dataUrl) return null;
  const arr = dataUrl.split(',');
  // @ts-ignore
  const mime = arr ? arr[0].match(/:(.*?);/)[1] : null;
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

/***
 *
 * @param url
 * @param imgName should add with file extension
 */
export const getFileFromImgUrl = async (url: string, imgName: string) => {
  try {
    if (!url) return null;
    const dataUrl = (await covertImgUrlToBlob(url)) as string;
    return dataURLtoFile(dataUrl, imgName);
  } catch (e) {
    console.error(
      'getFileFromImgUrl error:' +
        'url:' +
        url +
        ',imgName:' +
        imgName +
        '\n' +
        e,
    );
    return null;
  }
};
