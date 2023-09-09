import * as zod from 'zod';

const schema = zod.object({
  name: zod.string().min(1),
  date: zod.date(),
  notes: zod.string().optional(),
  balance: zod.coerce.number(),
});

type BankAccountFormData = zod.infer<typeof schema>;

export type { BankAccountFormData };

export default schema;
