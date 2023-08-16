import * as yup from 'yup';

import { commonStringValidator } from '@/helpers/validators';

export default yup.object({
  date: yup.date().required(),
  notes: yup.string().optional(),
  value: commonStringValidator,
  type: yup.mixed().oneOf(['income', 'expense']),
});
