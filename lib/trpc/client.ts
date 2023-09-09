import type { inferReactQueryProcedureOptions } from '@trpc/react-query';
import { createTRPCReact } from '@trpc/react-query';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { type AppRouter } from '@/server';

// infer the types for your router
type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;

type RouterInputs = inferRouterInputs<AppRouter>;

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type { ReactQueryOptions, RouterInputs, RouterOutputs };

export default createTRPCReact<AppRouter>({
  abortOnUnmount: true,
});
