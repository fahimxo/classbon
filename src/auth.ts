import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { createData } from "./core/http-service/http-service";
import { VerifyUserModel } from "./app/(auth)/verify/_types/verify-user.type";
import { User, UserSession, UserToken } from "./types/user.interface";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";
import { Problem } from "./types/http-errors.interface";

declare module "next-auth" {
  interface User {
    accessToken: string;
  }
  interface Session {
    user: UserSession;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    user: UserToken;
  }
}

export class AuthorizeError extends CredentialsSignin {
  problem: Problem;
  constructor(error: Problem) {
    super();
    this.problem = error;
  }
}

export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        code: { label: "code", type: "text" },
      },
      async authorize(credentials) {
        try {
          const user = await createData<VerifyUserModel, User>("verify", {
            username: credentials.username as string,
            code: credentials.code as string,
          });

          return {
            accessToken: user.token,
          };
        } catch (error: unknown) {
          throw new AuthorizeError(error as Problem);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = jwtDecode<UserToken>(user.accessToken);
        token.user.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      Object.assign(session.user, token.user ?? {});
      return session;
    },
  },
});
