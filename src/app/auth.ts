/*eslint-disable*/
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { AuthOptions } from "next-auth"; // Import AuthOptions

export const authOptions: AuthOptions = {
  pages: { signIn: "/login" },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/v1/auth/signin`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const payload = await response.json();

        if (payload.message === "success") {
          const { id }: { id: string } = jwtDecode(payload.token);

          return {
            id: id,
            name: payload.user.name,
            email: payload.user.email,
            role: payload.user.role,
            token: payload.token,
          };
        }

        throw new Error(payload.message || "Invalid Email or Password");
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.token = token.token;

      return session;
    },
  },
};
