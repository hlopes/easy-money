import * as yup from 'yup';

import { commonStringValidator } from '@/app/_helpers/validators';

export default yup.object({
  name: yup.string().required(),
  date: yup.date().required(),
  notes: yup.string().optional(),
  balance: commonStringValidator,
});
