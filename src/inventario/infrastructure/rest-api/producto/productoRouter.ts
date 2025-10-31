import { Router } from "express";
import container from "../../../../core/infrastructure/container";
import { ProductoController } from "./productoController";
import { authMiddleware } from "../../../../core/middlewares/authMiddleware";

const productoRouter = Router();
const productoController = container.resolve<ProductoController>("productoController");

productoRouter.get("/lista", authMiddleware, productoController.getAll.bind(productoController));
productoRouter.post("/crear", authMiddleware, productoController.create.bind(productoController));
productoRouter.put("/actualizar/:id", authMiddleware, productoController.update.bind(productoController));
productoRouter.delete("/eliminar/:id", authMiddleware, productoController.delete.bind(productoController));

export default productoRouter;
