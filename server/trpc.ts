import superjson from 'superjson';
import { initTRPC } from '@trpc/server';

const t = initTRPC.create({
  transformer: superjson,
});

const router = t.router;

const publicProcedure = t.procedure;

export { publicProcedure, router };
