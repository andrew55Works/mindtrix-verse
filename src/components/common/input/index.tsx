import { TextInput } from './text-input';
import { PasswordInput } from './password-input';

export type InputType = typeof TextInput | typeof PasswordInput;

const Input = {
  Text: TextInput,
  Password: PasswordInput,
};

export default Input;
