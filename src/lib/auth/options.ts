import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'cognito',
      name: 'Cognito',
      type: 'oauth',
      version: '2.0',
      authorization: {
        url: `https://${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/authorize`,
        params: {
          scope: 'openid email profile',
          response_type: 'code',
        },
      },
      token: {
        url: `https://${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/token`,
      },
      userinfo: {
        url: `https://${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/userInfo`,
      },
      clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.role = user.role || 'customer';
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
