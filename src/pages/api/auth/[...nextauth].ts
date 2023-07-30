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

        if (email === "super-admin@email.com" && password === "password") {
          return { id: "1", name: "Super Admin", email: "super-admin@email.com", role: 3 };
        }

        if (email === "admin@email.com" && password === "password") {
          return { id: "2", name: "Admin", email: "admin@email.com", role: 2 };
        }

        if (email === "user@email.com" && password === "password") {
          return { id: "3", name: "User", email: "user@email.com", role: 1 };
        }

        return null;
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
