import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"; // Correct import
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "./sanity/lib/write_client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!, // GitHub client ID
      clientSecret: process.env.AUTH_GITHUB_SECRET!, // GitHub client secret
      authorization: { params: { scope: "read:user user:email" } },
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      const { id, login, bio } = profile;
      try {
        const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id,
        });
        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id,
            name: user.name,
            username: login,
            email: user.email,
            image: user.image,
            bio: bio || "",
          });
        }
        return true; // Must return true for successful sign-in
      } catch (err) {
        console.error("Sign-in callback error:", err);
        return false; // Denies access
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
