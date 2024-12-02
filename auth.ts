import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID, // GitHub client ID
      clientSecret: process.env.AUTH_GITHUB_SECRET, // GitHub client secret
    }),
  ],
  secret: process.env.AUTH_SECRET, // Use the auth secret if required for security
});
