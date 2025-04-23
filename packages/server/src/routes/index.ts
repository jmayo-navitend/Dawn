import { Router } from "express";

// Import all routes
import userRoutes from "./user.routes";

const router = Router();

// User all routes
router.use("/user", userRoutes);

export default router;
