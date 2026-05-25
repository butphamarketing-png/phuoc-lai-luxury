import { and, eq, gt } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db, adminUsers, adminSessions, type AdminUser } from "@workspace/db";
import type { Response } from "express";

export const ADMIN_SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export function toAdminUserDto(user: AdminUser) {
  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
  };
}

export function setSessionCookie(res: Response, sessionId: string) {
  res.cookie(ADMIN_SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_MS,
    path: "/",
  });
}

export function clearSessionCookie(res: Response) {
  res.clearCookie(ADMIN_SESSION_COOKIE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_MS);
  const [session] = await db
    .insert(adminSessions)
    .values({ userId, expiresAt })
    .returning();

  return session;
}

export async function deleteSession(sessionId: string) {
  await db.delete(adminSessions).where(eq(adminSessions.id, sessionId));
}

export async function getSessionUser(sessionId: string | undefined) {
  if (!sessionId) {
    return null;
  }

  const [row] = await db
    .select({ user: adminUsers })
    .from(adminSessions)
    .innerJoin(adminUsers, eq(adminSessions.userId, adminUsers.id))
    .where(
      and(
        eq(adminSessions.id, sessionId),
        gt(adminSessions.expiresAt, new Date()),
      ),
    )
    .limit(1);

  return row?.user ?? null;
}

export async function verifyAdminCredentials(username: string, password: string) {
  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, username))
    .limit(1);

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  return isValid ? user : null;
}
