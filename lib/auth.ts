import type { NextAuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export type Plan = "Starter" | "Studio" | "Enterprise";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      plan: Plan;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    plan?: Plan;
    uid?: string;
  }
}

function buildProviders() {
  const providers: NextAuthOptions["providers"] = [];

  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    providers.push(
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    );
  }

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    );
  }

  return providers;
}

export const providerIds = (): ("github" | "google")[] => {
  const ids: ("github" | "google")[] = [];
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) ids.push("github");
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) ids.push("google");
  return ids;
};

/**
 * Deterministic plan assignment for the demo. Swap for real billing lookup.
 * Hash-like bucket over the user id keeps the same account on the same plan
 * between sessions without needing a database.
 */
function planFor(id: string | undefined): Plan {
  if (!id) return "Starter";
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  const bucket = Math.abs(h) % 10;
  if (bucket < 6) return "Starter";
  if (bucket < 9) return "Studio";
  return "Enterprise";
}

export const authOptions: NextAuthOptions = {
  providers: buildProviders(),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.uid = user.id ?? token.sub;
        token.plan = planFor(token.uid);
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.uid;
        session.user.plan = token.plan ?? planFor(token.uid);
      }
      return session;
    },
  },
};
