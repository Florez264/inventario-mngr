import { Request, Response } from "express";
import { ConsoleLogger } from "../../../../shared/infrastructure/console-logger";
import { AuthService } from "../../../application/services/AuthService";
import HttpStatusCodeEnum from "../../../../shared/domain/enums/http-status-code.enum";
import { Dependencies } from "../../../../core/domain/dependencies";
import { ResponseMessage } from "../../../../shared/utils/response.util";

export class AuthController {
  private logger: ConsoleLogger;
  private authService: AuthService;

  constructor({ logger, authService }: Dependencies) {
    this.logger = logger!;
    this.authService = authService!;
  }


/**
 * @api {post} /auth/register Registrar un nuevo usuario
 * @apiName RegisterUser
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParamExample {json} Request-Example:
 * {
 *   "nombre": "Ana Paez",
 *   "email": "ana@example.com",
 *   "password": "123456",
 *   "rol": "Cliente"
 * }
 *
 * @apiSuccess {Number} status Código de estado HTTP.
 * @apiSuccess {Object} data Contiene mensaje y datos del usuario registrado.
 * @apiSuccess {String} data.message Mensaje de éxito.
 * @apiSuccess {Object} data.user Datos del usuario registrado.
 * @apiSuccess {String} data.user.id ID único del usuario.
 * @apiSuccess {String} data.user.nombre Nombre del usuario.
 * @apiSuccess {String} data.user.email Email del usuario.
 * @apiSuccess {String} data.user.password Contraseña hasheada del usuario.
 * @apiSuccess {Object} data.user.rol Información del rol del usuario.
 * @apiSuccess {String} data.user.rol.id ID del rol.
 * @apiSuccess {String} data.user.rol.nombre Nombre del rol.
 * @apiSuccess {String} data.user.creadoEn Fecha de creación del usuario.
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "status": 201,
 *   "data": {
 *     "message": "Usuario registrado exitosamente",
 *     "user": {
 *       "id": "56c8b40a-632b-4fe5-b846-5ee666a16d19",
 *       "nombre": "Ana Paez",
 *       "email": "ana@example.com",
 *       "password": "$2b$10$DxKg4wqjPMdfq4OANWs5MuMRDinR3sD5l.sva.w5joIJaqY/B5twy",
 *       "rol": {
 *         "id": 2,
 *         "nombre": "Cliente"
 *       },
 *       "creadoEn": "2025-10-30T17:49:54.161Z"
 *     }
 *   }
 * }
 *
 * @apiError {Number} status Código de estado HTTP.
 * @apiError {String} message Mensaje de error.
 */
  async register(req: Request, res: Response) {
    try {
      this.logger.info("AuthController.register");

      const { nombre, email, password, rol } = req.body;
      const user = await this.authService.register(nombre, email, password, rol);

      const responseData: ResponseMessage = {
        status: HttpStatusCodeEnum.CREATED,
        data: {
          message: "Usuario registrado exitosamente",
          user,
        },
      };

      res.status(HttpStatusCodeEnum.CREATED).send(responseData);
    } catch (e) {
      this.logger.error({
        message: "Error en AuthController.register",
        context: { error: e },
      });

      res.status(HttpStatusCodeEnum.BAD_REQUEST).send({
        status: HttpStatusCodeEnum.BAD_REQUEST,
        message: e instanceof Error ? e.message : "Error registrando usuario",
      });
    }
  }

  /**
 * @api {post} /auth/login Iniciar sesión
 * @apiName LoginUser
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParamExample {json} Request-Example:
 * {
 *   "email": "juan@example.com",
 *   "password": "123456"
 * }
 *
 * @apiSuccess {Number} status Código de estado HTTP.
 * @apiSuccess {Object} data Contiene token y datos del usuario.
 * @apiSuccess {String} data.token Token JWT para autenticación.
 * @apiSuccess {Object} data.user Datos del usuario.
 * @apiSuccess {String} data.user.id ID único del usuario.
 * @apiSuccess {String} data.user.nombre Nombre del usuario.
 * @apiSuccess {String} data.user.email Email del usuario.
 * @apiSuccess {String} data.user.password Contraseña hasheada.
 * @apiSuccess {Object} data.user.rol Información del rol del usuario.
 * @apiSuccess {String} data.user.rol.id ID del rol.
 * @apiSuccess {String} data.user.rol.nombre Nombre del rol.
 * @apiSuccess {String} data.user.creadoEn Fecha de creación del usuario.
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "status": 200,
 *   "data": {
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *     "user": {
 *       "id": "04e3901e-278b-439a-97ae-baace376fc56",
 *       "nombre": "Juan Atencio",
 *       "email": "juan@example.com",
 *       "password": "$2b$10$.635XULKboOpLNy77i6BPuMCukaR9Ku8fP5P/B3Bl18EqfuhyysGW",
 *       "rol": {
 *         "id": 1,
 *         "nombre": "Administrador"
 *       },
 *       "creadoEn": "2025-10-30T08:48:57.531Z"
 *     }
 *   }
 * }
 *
 * @apiError {Number} status Código de estado HTTP.
 * @apiError {String} message Mensaje de error en caso de credenciales inválidas.
 */
  async login(req: Request, res: Response) {
    try {
      this.logger.info("AuthController.login");

      const { email, password } = req.body;
      const result = await this.authService.login(email, password);

      const responseData: ResponseMessage = {
        status: HttpStatusCodeEnum.OK,
        data: result,
      };

      res.status(HttpStatusCodeEnum.OK).send(responseData);
    } catch (e) {
      this.logger.error({
        message: "Error en AuthController.login",
        context: { error: e },
      });

      res.status(HttpStatusCodeEnum.UNAUTHORIZED).send({
        status: HttpStatusCodeEnum.UNAUTHORIZED,
        message: e instanceof Error ? e.message : "Credenciales inválidas",
      });
    }
  }
}
