import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: number;
    };
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    uid: number;
  }
}
