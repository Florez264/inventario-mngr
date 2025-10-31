import { Router } from "express";
import container from "../../../../core/infrastructure/container";
import { CompraController } from "./CompraController";
import { authMiddleware } from "../../../../core/middlewares/authMiddleware";

const compraRouter = Router();
const compraController = container.resolve<CompraController>("compraController");

compraRouter.post("/realizar-compra", authMiddleware, compraController.realizarCompra.bind(compraController));
compraRouter.get("/historial", authMiddleware, compraController.historial.bind(compraController));
compraRouter.get("/todas", authMiddleware, compraController.todas.bind(compraController));
compraRouter.get("/factura/:id", authMiddleware, compraController.obtenerFactura.bind(compraController));

export default compraRouter;