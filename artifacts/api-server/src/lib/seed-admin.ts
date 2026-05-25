import bcrypt from "bcryptjs";
import { db, adminUsers } from "@workspace/db";
import { logger } from "./logger";

export async function ensureDefaultAdmin() {
  const existing = await db.select({ id: adminUsers.id }).from(adminUsers).limit(1);
  if (existing.length > 0) {
    return;
  }

  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "phuoclai2026";
  const displayName = process.env.ADMIN_DISPLAY_NAME ?? "Master Phuoc Lai";

  const passwordHash = await bcrypt.hash(password, 12);
  await db.insert(adminUsers).values({
    username,
    passwordHash,
    displayName,
  });

  logger.info({ username }, "Created default admin user");
}
