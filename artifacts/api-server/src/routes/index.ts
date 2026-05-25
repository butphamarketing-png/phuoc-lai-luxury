import express, { type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";

const router: IRouter = express.Router();

router.use(healthRouter);
router.use(authRouter);

export default router;
