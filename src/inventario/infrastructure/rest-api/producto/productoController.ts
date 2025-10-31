import { Request, Response } from "express";
import { ConsoleLogger } from "../../../../shared/infrastructure/console-logger";
import { Dependencies } from "../../../../core/domain/dependencies";
import HttpStatusCodeEnum from "../../../../shared/domain/enums/http-status-code.enum";
import { ResponseMessage } from "../../../../shared/utils/response.util";
import { ProductoService } from "../../../application/services/ProductoService";

export class ProductoController {
  private logger: ConsoleLogger;
  private productoService: ProductoService;

  constructor({ logger, productoService }: Dependencies) {
    this.logger = logger!;
    this.productoService = productoService!;
  }

  /**
 * @api {post} /productos Crear un nuevo producto
 * @apiName CreateProducto
 * @apiGroup Producto
 * @apiVersion 1.0.0
 *
 * @apiParam {String} numeroLote Número de lote del producto.
 * @apiParam {String} nombre Nombre del producto.
 * @apiParam {Number} precio Precio del producto.
 * @apiParam {Number} cantidadDisponible Cantidad disponible del producto.
 * @apiParam {String} fechaIngreso Fecha de ingreso del producto (ISO 8601).
 *
 * @apiParamExample {json} Request-Example:
 * {
 *   "numeroLote": "L001",
 *   "nombre": "Producto A",
 *   "precio": 120.50,
 *   "cantidadDisponible": 10,
 *   "fechaIngreso": "2025-10-30T08:48:57.531Z"
 * }
 *
 * @apiSuccess {Number} status Código HTTP (201).
 * @apiSuccess {Object} data Contiene mensaje y el producto creado.
 * @apiSuccess {String} data.message Mensaje de éxito.
 * @apiSuccess {Object} data.producto Datos del producto creado.
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "status": 201,
 *   "data": {
 *     "message": "Producto creado exitosamente",
 *     "producto": {
 *       "id": 1,
 *       "numeroLote": "L001",
 *       "nombre": "Producto A",
 *       "precio": 120.5,
 *       "cantidadDisponible": 10,
 *       "fechaIngreso": "2025-10-30T08:48:57.531Z"
 *     }
 *   }
 * }
 *
 * @apiError {Number} status Código HTTP (400).
 * @apiError {String} message Mensaje de error.
 */
  async create(req: Request, res: Response) {
    try {
      this.logger.info("ProductoController.create");

      const { numeroLote, nombre, precio, cantidadDisponible, fechaIngreso } = req.body;
      const producto = await this.productoService.crearProducto({
        numeroLote,
        nombre,
        precio,
        cantidadDisponible,
        fechaIngreso,
      });

      const responseData: ResponseMessage = {
        status: HttpStatusCodeEnum.CREATED,
        data: {
          message: "Producto creado exitosamente",
          producto,
        },
      };

      res.status(HttpStatusCodeEnum.CREATED).send(responseData);
    } catch (e) {
      this.logger.error({
        message: "Error en ProductoController.create",
        context: { error: e },
      });

      res.status(HttpStatusCodeEnum.BAD_REQUEST).send({
        status: HttpStatusCodeEnum.BAD_REQUEST,
        message: e instanceof Error ? e.message : "Error creando producto",
      });
    }
  }


  /**
   * @api {get} /productos Listar todos los productos
   * @apiName GetAllProductos
   * @apiGroup Producto
   * @apiVersion 1.0.0
   *
   * @apiSuccess {Number} status Código HTTP (200).
   * @apiSuccess {Object[]} data Lista de productos.
   *
   * @apiSuccessExample {json} Success-Response:
   * {
   *   "status": 200,
   *   "data": [
   *     {
   *       "id": 1,
   *       "numeroLote": "L001",
   *       "nombre": "Producto A",
   *       "precio": 120.5,
   *       "cantidadDisponible": 10,
   *       "fechaIngreso": "2025-10-30T08:48:57.531Z"
   *     },
   *     {
   *       "id": 2,
   *       "numeroLote": "L002",
   *       "nombre": "Producto B",
   *       "precio": 80.0,
   *       "cantidadDisponible": 5,
   *       "fechaIngreso": "2025-10-29T12:00:00.000Z"
   *     }
   *   ]
   * }
   *
   * @apiError {Number} status Código HTTP (500).
   * @apiError {String} message Mensaje de error.
   */
  async getAll(req: Request, res: Response) {
    try {
      this.logger.info("ProductoController.getAll");

      const productos = await this.productoService.listarProductos();

      const responseData: ResponseMessage = {
        status: HttpStatusCodeEnum.OK,
        data: productos,
      };

      res.status(HttpStatusCodeEnum.OK).send(responseData);
    } catch (e) {
      this.logger.error({
        message: "Error en ProductoController.getAll",
        context: { error: e },
      });

      res.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).send({
        status: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        message: e instanceof Error ? e.message : "Error obteniendo productos",
      });
    }
  }

  /**
 * @api {put} /productos/:id Actualizar un producto
 * @apiName UpdateProducto
 * @apiGroup Producto
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id ID del producto a actualizar.
 * @apiParam {String} [numeroLote] Número de lote.
 * @apiParam {String} [nombre] Nombre del producto.
 * @apiParam {Number} [precio] Precio del producto.
 * @apiParam {Number} [cantidadDisponible] Cantidad disponible.
 * @apiParam {String} [fechaIngreso] Fecha de ingreso (ISO 8601).
 *
 * @apiParamExample {json} Request-Example:
 * {
 *   "nombre": "Producto A Actualizado",
 *   "precio": 130.0
 * }
 *
 * @apiSuccess {Number} status Código HTTP (200).
 * @apiSuccess {Object} data Contiene mensaje y producto actualizado.
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "status": 200,
 *   "data": {
 *     "message": "Producto actualizado correctamente",
 *     "producto": {
 *       "id": 1,
 *       "numeroLote": "L001",
 *       "nombre": "Producto A Actualizado",
 *       "precio": 130.0,
 *       "cantidadDisponible": 10,
 *       "fechaIngreso": "2025-10-30T08:48:57.531Z"
 *     }
 *   }
 * }
 *
 * @apiError {Number} status Código HTTP (400).
 * @apiError {String} message Mensaje de error.
 */
  async update(req: Request, res: Response) {
    try {
      this.logger.info("ProductoController.update");

      const { id } = req.params;
      const data = req.body;

      const updated = await this.productoService.actualizarProducto(Number(id), data);

      const responseData: ResponseMessage = {
        status: HttpStatusCodeEnum.OK,
        data: {
          message: "Producto actualizado correctamente",
          producto: updated,
        },
      };

      res.status(HttpStatusCodeEnum.OK).send(responseData);
    } catch (e) {
      this.logger.error({
        message: "Error en ProductoController.update",
        context: { error: e },
      });

      res.status(HttpStatusCodeEnum.BAD_REQUEST).send({
        status: HttpStatusCodeEnum.BAD_REQUEST,
        message: e instanceof Error ? e.message : "Error actualizando producto",
      });
    }
  }


  /**
   * @api {delete} /productos/:id Eliminar un producto
   * @apiName DeleteProducto
   * @apiGroup Producto
   * @apiVersion 1.0.0
   *
   * @apiParam {Number} id ID del producto a eliminar.
   *
   * @apiSuccess {Number} status Código HTTP (200).
   * @apiSuccess {Object} data Contiene mensaje de éxito.
   *
   * @apiSuccessExample {json} Success-Response:
   * {
   *   "status": 200,
   *   "data": {
   *     "message": "Producto eliminado correctamente"
   *   }
   * }
   *
   * @apiError {Number} status Código HTTP (400).
   * @apiError {String} message Mensaje de error.
   */
  async delete(req: Request, res: Response) {
    try {
      this.logger.info("ProductoController.delete");

      const { id } = req.params;
      await this.productoService.eliminarProducto(Number(id));

      const responseData: ResponseMessage = {
        status: HttpStatusCodeEnum.OK,
        data: { message: "Producto eliminado correctamente" },
      };

      res.status(HttpStatusCodeEnum.OK).send(responseData);
    } catch (e) {
      this.logger.error({
        message: "Error en ProductoController.delete",
        context: { error: e },
      });

      res.status(HttpStatusCodeEnum.BAD_REQUEST).send({
        status: HttpStatusCodeEnum.BAD_REQUEST,
        message: e instanceof Error ? e.message : "Error eliminando producto",
      });
    }
  }
}
