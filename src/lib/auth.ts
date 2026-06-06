import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("habbah_session")?.value;
    if (!token) return null;

    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session) return null;
    if (session.expiresAt < new Date()) {
      await prisma.session.delete({ where: { token } });
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function requireAuth(role?: string) {
  const session = await getSession();
  if (!session) return null;
  if (role && session.user.role !== role) return null;
  return session;
}

export function generateToken(length = 64): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}
