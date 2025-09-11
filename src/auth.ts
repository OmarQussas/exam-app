import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "./lib/api/auth-api/auth.api";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  // Custom sign-in page URL
  pages: {
    signIn: "/login",
  },

  // Define authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Call your backend login
        const res = await loginUser(credentials.email, credentials.password);
        const user = res?.user;

        // Return user object or null
        return {
          id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          name: user.username, // NextAuth expects "name"
          email: user.email,
          role: user.role,
          accessToken: res.token, // store JWT
        };
      },
    }),
  ],

  // Use JWT strategy for sessions
  session: {
    strategy: "jwt",
  },

  // Callbacks to customize token and session
  callbacks: {
    // Called when JWT token is created or updated
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.name = user.username; // keep `name` for NextAuth
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }

      return token;
    },

    // Called whenever a session is checked (client or server side)
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.name = token.name ?? null; // keep NextAuth compatibility
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
