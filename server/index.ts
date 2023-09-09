import { bankAccountsProcedures, transactionsProcedures } from './procedures';
import { router } from './trpc';

export const appRouter = router({
  ...bankAccountsProcedures,
  ...transactionsProcedures,
});

export type AppRouter = typeof appRouter;
