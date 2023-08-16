import * as yup from 'yup';

const patternTwoDigitsAfterComma = /^-?\d+(\.\d{0,2})?$/;

export const commonStringValidator = yup
  .number()
  .test(
    'is-decimal',
    'The amount should be a decimal with maximum two digits after comma',
    (val: any) => {
      if (val != undefined) {
        return patternTwoDigitsAfterComma.test(val);
      }

      return true;
    }
  )
  .required();
