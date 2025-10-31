import { Router } from "express";
import container from "../../../../core/infrastructure/container";
import { AuthController } from "./authController";
import { authMiddleware } from "../../../../core/middlewares/authMiddleware";

const authRouter = Router();
const authController = container.resolve<AuthController>("authController");

/**
 * Rutas públicas
 */
authRouter.post("/login", authController.login.bind(authController));
authRouter.post("/register", authController.register.bind(authController));

export default authRouter;
