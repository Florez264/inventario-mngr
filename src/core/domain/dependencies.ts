import { IUserRepository } from './../../inventario/domain/repositories/IUserRepository';
import { AuthService } from './../../inventario/application/services/AuthService';
import { AuthController } from './../../inventario/infrastructure/rest-api/authController';
import {ConsoleLogger} from "../../shared/infrastructure/console-logger";
import { ProductoService } from '../../inventario/application/services/ProductoService';
import { CompraService } from '../../inventario/application/services/CompraService';
import { CompraController } from '../../inventario/infrastructure/rest-api/CompraController';
import { ProductoController } from '../../inventario/infrastructure/rest-api/productoController';


export interface Dependencies {
  logger?: ConsoleLogger;
  authService?: AuthService;
  productoService?: ProductoService;
  compraService?: CompraService;
  userRepository?: IUserRepository;
  authController?: AuthController;
  productoController?: ProductoController;
  compraController?: CompraController;
}