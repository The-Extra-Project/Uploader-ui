import User from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
    };
    // added in order to do type matching with the another verison of the next-auth
    supabaseAccessToken: string;
  }
}
