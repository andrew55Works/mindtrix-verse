import { v4 as uuid } from 'uuid';

export const generateKey = () => {
  return uuid();
};
