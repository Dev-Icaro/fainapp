import { FieldValues } from 'react-hook-form';

export const isInputInvalid = (err: FieldValues): boolean => {
  if (Object.keys(err).length > 0) {
    return true;
  }
  return false;
};
