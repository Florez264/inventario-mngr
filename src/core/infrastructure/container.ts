import { asClass, createContainer } from "awilix";
import { ConsoleLogger } from "../../shared/infrastructure/console-logger";
import { AuthController } from "../../inventario/infrastructure/rest-api/authController";
import { AuthService } from "../../inventario/application/services/AuthService";
import { UserRepository } from "../../inventario/infrastructure/repositories/UserRepositoryImpl";
import { ProductoRepositoryImpl } from "../../inventario/infrastructure/repositories/ProductoRepositoryImpl";
import { ProductoService } from "../../inventario/application/services/ProductoService";
import { ProductoController } from "../../inventario/infrastructure/rest-api/productoController";
import { CompraRepositoryImpl } from "../../inventario/infrastructure/repositories/CompraRepositoryImpl";
import { CompraService } from "../../inventario/application/services/CompraService";
import { CompraController } from "../../inventario/infrastructure/rest-api/CompraController";

const container = createContainer();

container.register({
    logger: asClass(ConsoleLogger).singleton(),
    userRepository: asClass(UserRepository).singleton(),
    authService: asClass(AuthService).singleton(),
    authController: asClass(AuthController).singleton(),

    productoRepository: asClass(ProductoRepositoryImpl).singleton(),
    productoService: asClass(ProductoService).singleton(),
    productoController: asClass(ProductoController).singleton(),

    compraRepository: asClass(CompraRepositoryImpl).singleton(),
    compraService: asClass(CompraService).singleton(),
    compraController: asClass(CompraController).singleton(),

});

export default container;