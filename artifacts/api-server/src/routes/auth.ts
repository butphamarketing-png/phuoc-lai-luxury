import express, { type IRouter, type Request, type Response } from "express";
import {
  AdminLoginBody,
  AdminLoginResponse,
  AdminMeResponse,
} from "@workspace/api-zod";
import {
  clearSessionCookie,
  createSession,
  deleteSession,
  setSessionCookie,
  toAdminUserDto,
  verifyAdminCredentials,
} from "../lib/auth";
import { requireAdmin } from "../middleware/require-admin";

const router: IRouter = express.Router();

router.post("/auth/login", async (req: Request, res: Response) => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }

  const user = await verifyAdminCredentials(
    parsed.data.username,
    parsed.data.password,
  );

  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const session = await createSession(user.id);
  setSessionCookie(res, session.id);

  const data = AdminLoginResponse.parse({ user: toAdminUserDto(user) });
  res.json(data);
});

router.post("/auth/logout", async (req: Request, res: Response) => {
  const sessionId = req.cookies?.admin_session;
  if (sessionId) {
    await deleteSession(sessionId);
  }

  clearSessionCookie(res);
  res.status(204).send();
});

router.get("/auth/me", requireAdmin, (req: Request, res: Response) => {
  const data = AdminMeResponse.parse(toAdminUserDto(req.adminUser!));
  res.json(data);
});

export default router;
