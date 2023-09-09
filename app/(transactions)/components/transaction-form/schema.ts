import * as zod from 'zod';

const schema = zod.object({
  id: zod.string().optional(),
  bankAccountId: zod.string(),
  date: zod.date(),
  notes: zod.string().optional(),
  value: zod.coerce.number(),
  type: zod.union([zod.literal('INCOME'), zod.literal('EXPENSE')]).optional(),
});

type TransactionFormData = zod.infer<typeof schema>;

export type { TransactionFormData };

export default schema;
