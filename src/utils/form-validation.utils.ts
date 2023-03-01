// 合法格式：example@somedomain.com
export const emailRegEx = new RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
);

// 至少要有六字元
export const passwordRegEx = new RegExp(/.{6,}/);

export const noneValidation = (value?: string) => true;

// 至少要有一字元，且開頭不可為空白字串
export const nameValidation = (value?: string): boolean =>
  !(!value || value.startsWith(' '));

// 至少要有一字元的數字
export const numberValidation = (
  value?: string,
  isDefaultNotZero = true,
): boolean => {
  try {
    if (Number(value) === 0) return !isDefaultNotZero;
    return !!value && !isNaN(Number(value));
  } catch (e) {
    return false;
  }
};

export const invitationCodeValidation = (value?: string): boolean =>
  !!value && (value.trim()?.length ?? 0) >= 6;

export const newPasswordValidation = (
  newPassword?: string,
  confirmedPassword?: string,
) => {
  return (
    !!newPassword &&
    (newPassword.trim()?.length ?? 0) >= 6 &&
    newPassword === confirmedPassword
  );
};
