import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Add id field
    role: string;
    token: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    token: string;
  }
}
