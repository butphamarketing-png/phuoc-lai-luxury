import type { NextFunction, Request, Response } from "express";
import { getSessionUser } from "../lib/auth";

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = await getSessionUser(req.cookies?.admin_session);

  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  req.adminUser = user;
  next();
}
