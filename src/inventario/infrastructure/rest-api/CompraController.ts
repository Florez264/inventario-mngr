import { Request, Response } from "express";
import { ConsoleLogger } from "../../../shared/infrastructure/console-logger";
import { Dependencies } from "../../../core/domain/dependencies";
import HttpStatusCodeEnum from "../../../shared/domain/enums/http-status-code.enum";
import { ResponseMessage } from "../../../shared/utils/response.util";
import { CompraService } from "../../application/services/CompraService";

export class CompraController {
  private logger: ConsoleLogger;
  private compraService: CompraService;

  constructor({ logger, compraService }: Dependencies) {
    this.logger = logger!;
    this.compraService = compraService!;
  }

  /**
  * @api {post} /compras Realizar una compra
  * @apiName RealizarCompra
  * @apiGroup Compra
  * @apiVersion 1.0.0
  *
  * @apiDescription Registrar una nueva compra para el cliente autenticado.
  *
  * @apiParam {Object[]} productos Lista de productos a comprar.
  * @apiParam {Number} productos.id ID del producto.
  * @apiParam {Number} productos.cantidad Cantidad del producto.
  *
  * @apiParamExample {json} Request-Example:
  * {
  *   "productos": [
  *     { "id": 1, "cantidad": 2 },
  *     { "id": 2, "cantidad": 1 }
  *   ]
  * }
  *
  * @apiSuccess {Number} status Código HTTP (201).
  * @apiSuccess {Object} data Contiene mensaje y detalles de la compra.
  * @apiSuccess {String} data.message Mensaje de éxito.
  * @apiSuccess {Object} data.compra Datos de la compra realizada.
  *
  * @apiError {Number} status Código HTTP (400).
  * @apiError {String} message Mensaje de error en caso de fallo.
  */
  async realizarCompra(req: Request, res: Response) {
    try {
      this.logger.info("CompraController.realizarCompra");

      const usuario = (req as any).user;
      const { productos } = req.body;

      const compra = await this.compraService.realizarCompra(usuario, productos);

      const responseData: ResponseMessage = {
        status: HttpStatusCodeEnum.CREATED,
        data: {
          message: "Compra realizada exitosamente",
          compra,
        },
      };

      res.status(HttpStatusCodeEnum.CREATED).send(responseData);
    } catch (e) {
      this.logger.error({
        message: "Error en CompraController.realizarCompra",
        context: { error: e },
      });

      res.status(HttpStatusCodeEnum.BAD_REQUEST).send({
        status: HttpStatusCodeEnum.BAD_REQUEST,
        message: e instanceof Error ? e.message : "Error al realizar compra",
      });
    }
  }

  /**
  * @api {get} /compras/historial Obtener historial de compras
  * @apiName HistorialCompras
  * @apiGroup Compra
  * @apiVersion 1.0.0
  *
  * @apiDescription Retorna todas las compras realizadas por el cliente autenticado.
  *
  * @apiSuccess {Number} status Código HTTP (200).
  * @apiSuccess {Object[]} data Lista de compras.
  * @apiSuccess {Number} data.id ID de la compra.
  * @apiSuccess {String} data.fechaCompra Fecha de la compra.
  * @apiSuccess {String} data.total Total de la compra.
  * @apiSuccess {Object[]} data.detalles Detalles de cada producto en la compra.
  *
  * @apiSuccessExample {json} Success-Response:
  * {
  *   "status": 200,
  *   "data": [
  *     {
  *       "id": 1,
  *       "fechaCompra": "2025-10-30T04:55:00.220Z",
  *       "total": "9000.00",
  *       "detalles": [
  *         {
  *           "id": 1,
  *           "cantidad": 2,
  *           "precioUnitario": "3000.00",
  *           "subtotal": "6000.00",
  *           "producto": {
  *             "id": 1,
  *             "numeroLote": "L-002",
  *             "nombre": "Laptop Lenovo",
  *             "precio": "3000.00",
  *             "cantidadDisponible": 6,
  *             "fechaIngreso": "2025-10-29",
  *             "creadoEn": "2025-10-30T09:49:43.320Z"
  *           }
  *         }
  *       ]
  *     }
  *   ]
  * }
  *
  * @apiError {Number} status Código HTTP (500).
  * @apiError {String} message Mensaje de error.
  */
  async historial(req: Request, res: Response) {
    try {
      this.logger.info("CompraController.historial");

      const usuario = (req as any).user;
      const compras = await this.compraService.historialPorCliente(usuario);

      const responseData: ResponseMessage = {
        status: HttpStatusCodeEnum.OK,
        data: compras,
      };

      res.status(HttpStatusCodeEnum.OK).send(responseData);
    } catch (e) {
      this.logger.error({
        message: "Error en CompraController.historial",
        context: { error: e },
      });

      res.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).send({
        status: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        message: e instanceof Error ? e.message : "Error al obtener historial",
      });
    }
  }

  /**
  * @api {get} /compras/todas Listar todas las compras
  * @apiName TodasLasCompras
  * @apiGroup Compra
  * @apiVersion 1.0.0
  *
  * @apiDescription Retorna todas las compras (solo accesible para admins).
  *
  * @apiSuccess {Number} status Código HTTP (200).
  * @apiSuccess {Object[]} data Lista de compras con usuario y detalles.
  *
  * @apiSuccessExample {json} Success-Response:
  * {
  *   "status": 200,
  *   "data": [
  *     {
  *       "id": 1,
  *       "fechaCompra": "2025-10-30T04:55:00.220Z",
  *       "total": "9000.00",
  *       "usuario": {
  *         "id": "04e3901e-278b-439a-97ae-baace376fc56",
  *         "nombre": "Juan Atencio",
  *         "email": "juan@example.com"
  *       },
  *       "detalles": [
  *         {
  *           "id": 1,
  *           "cantidad": 2,
  *           "precioUnitario": "3000.00",
  *           "subtotal": "6000.00",
  *           "producto": {
  *             "id": 1,
  *             "nombre": "Producto A Actualizado",
  *             "numeroLote": "L-002",
  *             "precio": "130.00"
  *           }
  *         }
  *       ]
  *     }
  *   ]
  * }
  *
  * @apiError {Number} status Código HTTP (500).
  * @apiError {String} message Mensaje de error.
  */
  async todas(req: Request, res: Response) {
    try {
      this.logger.info("CompraController.todas");

      const compras = await this.compraService.todasLasCompras();

      const responseData: ResponseMessage = {
        status: HttpStatusCodeEnum.OK,
        data: compras,
      };

      res.status(HttpStatusCodeEnum.OK).send(responseData);
    } catch (e) {
      this.logger.error({
        message: "Error en CompraController.todas",
        context: { error: e },
      });

      res.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).send({
        status: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        message: e instanceof Error ? e.message : "Error al listar compras",
      });
    }
  }


  /**
   * @api {get} /compras/:id/factura Obtener factura de una compra
   * @apiName ObtenerFactura
   * @apiGroup Compra
   * @apiVersion 1.0.0
   *
   * @apiParam {Number} id ID de la compra.
   *
   * @apiSuccess {Number} status Código HTTP (200).
   * @apiSuccess {Object} data Contiene la factura de la compra.
   *
   * @apiSuccessExample {json} Success-Response:
   * {
   *   "status": 200,
   *   "data": {
   *     "factura": {
   *       "numeroFactura": 1,
   *       "fechaCompra": "2025-10-30T04:55:00.220Z",
   *       "cliente": {
   *         "id": "04e3901e-278b-439a-97ae-baace376fc56",
   *         "nombre": "Juan Atencio",
   *         "email": "juan@example.com"
   *       },
   *       "productos": [
   *         {
   *           "id": 2,
   *           "nombre": "Laptop Lenovo",
   *           "numeroLote": "L-002",
   *           "cantidad": 1,
   *           "precioUnitario": 3000,
   *           "subtotal": 3000
   *         }
   *       ],
   *       "total": 9000
   *     }
   *   }
   * }
   *
   * @apiError {Number} status Código HTTP (403 o 404).
   * @apiError {String} message Mensaje de error si no tiene permiso o no se encuentra la factura.
   */
  async obtenerFactura(req: Request, res: Response) {
    try {
      this.logger.info("CompraController.obtenerFactura");

      const usuario = (req as any).user;
      const { id } = req.params;

      const factura = await this.compraService.obtenerFactura(Number(id), usuario);

      const responseData: ResponseMessage = {
        status: HttpStatusCodeEnum.OK,
        data: factura,
      };

      res.status(HttpStatusCodeEnum.OK).send(responseData);
    } catch (e) {
      this.logger.error({
        message: "Error en CompraController.obtenerFactura",
        context: { error: e },
      });

      const statusCode = e instanceof Error && e.message.includes("permiso")
        ? HttpStatusCodeEnum.FORBIDDEN
        : HttpStatusCodeEnum.NOT_FOUND;

      res.status(statusCode).send({
        status: statusCode,
        message: e instanceof Error ? e.message : "Error al obtener factura",
      });
    }
  }
}
