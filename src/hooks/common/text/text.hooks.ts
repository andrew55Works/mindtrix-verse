import { ITextValidate } from '../../../components/common/input/common-input';

export const validatePattern = ({ pattern, value }: ITextValidate) => {
  if (!value || !pattern) return false;
  return pattern.test(value);
};

export const validateText = ({
  customValidation,
  pattern,
  value,
}: ITextValidate) => {
  const isCustomValidationExist = typeof customValidation === 'function';
  return isCustomValidationExist
    ? customValidation(value)
    : validatePattern({ pattern, value });
};
