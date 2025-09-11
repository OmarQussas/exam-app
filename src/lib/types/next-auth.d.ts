import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role: string;
    accessToken?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      username?: string;
      email?: string | null;
      role?: string;
      accessToken?: string;
      firstName?: string;
      lastName?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string;
    email?: string;
    role?: string;
    accessToken?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
  }
}

type VerifyResetCodePayload = {
  resetCode: string;
};
