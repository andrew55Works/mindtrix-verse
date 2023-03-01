export const getBase64Encode = (str: string) => {
  return Buffer.from(str).toString('base64');
};
