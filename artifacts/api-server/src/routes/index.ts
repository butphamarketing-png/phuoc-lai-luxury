import express, { type IRouter } from "express";
import healthRouter from "./health";

const router: IRouter = express.Router();

router.use(healthRouter);

export default router;
