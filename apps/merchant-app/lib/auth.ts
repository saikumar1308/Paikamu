import Github from "next-auth/providers/github";
import db from "@repo/db/client"

export const authOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || ""
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  callbacks: {
    async signIn({ user, account }: {
      user: {
        email: string,
        name: string
      },
      account: {
        provider: "google" | "github"
      }
    }) {
      console.log("hi signin")
      if (!user || !user.email) {
        return false;
      }
      await db.merchant.upsert({
        select: {
          id: true
        },
        where: {
          email: user.email
        },
        create: {
          email: user.email,
          name: user.name,
          auth_type: account.provider === "google" ? "Google" : "Github" // Use a prisma type here
        },
        update: {
          name: user.name,
          auth_type: account.provider === "google" ? "Google" : "Github" // Use a prisma type here
        }
      });
      return true;
    }
  },
}