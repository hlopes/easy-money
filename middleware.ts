import { withAuth } from 'next-auth/middleware';

// middleware is applied to all routes, use conditionals to select

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ token }) => {
      return token !== null;
    },
  },
});
