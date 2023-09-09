import { httpBatchLink } from '@trpc/client';

import { apiBaseUrl } from '@/config/vars';
import { appRouter } from '@/server';

export default appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${apiBaseUrl}/trpc`,
    }),
  ],
});
