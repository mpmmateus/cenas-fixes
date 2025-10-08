import NextAuth, { type AuthOptions, type User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@/lib/db";

interface DBUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req
      ): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Obter utilizador da BD
        const result = await sql<DBUser>`
          SELECT * FROM users WHERE email = ${credentials.email}
        `;

        // Em @vercel/postgres, os dados estão em result.rows
        const user = (result as any).rows?.[0] as DBUser | undefined;
        if (!user) return null;

        // Comparar senha (texto simples neste caso)
        if (user.password !== credentials.password) return null;

        // Retorna o utilizador autenticado com o tipo correto
        return { id: String(user.id), name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
