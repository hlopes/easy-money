import NextAuth from 'next-auth';

import authOptions from './autOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
