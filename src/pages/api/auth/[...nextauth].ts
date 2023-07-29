import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        console.log(email, password);

        if (email !== "admin@email.com" || password !== "password") return null;

        return { id: "1", name: "Admin", email: "admin@email.com" };
      },
    }),
  ],
  callbacks: {
    // called when a JWT is created or updated!
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user, id: user.id };
      }
      return token;
    },

    // called whenever a session is checked. e.g getSession(), useSession() & /api/auth/session
    async session({ session, token }) {
      // eslint-disable-next-line no-param-reassign
      session.user = token;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);
