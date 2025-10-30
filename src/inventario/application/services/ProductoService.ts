import { IProductoRepository } from "../../domain/repositories/IProductoRepository";
import { Producto } from "../../domain/model/Producto";

export class ProductoService {
  private readonly productoRepository: IProductoRepository;

  constructor({ productoRepository }: { productoRepository: IProductoRepository }) {
    this.productoRepository = productoRepository;
  }

  async listarProductos() {
    return await this.productoRepository.findAll();
  }

  async crearProducto(data: Partial<Producto>) {
    const nuevoProducto = Object.assign(new Producto(), data);
    return await this.productoRepository.save(nuevoProducto);
  }

  async actualizarProducto(id: number, data: Partial<Producto>) {
    const producto = await this.productoRepository.findById(id);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    Object.assign(producto, data);
    return await this.productoRepository.update(producto);
  }

  async eliminarProducto(id: number) {
    const producto = await this.productoRepository.findById(id);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    await this.productoRepository.delete(id);
    return { message: "Producto eliminado exitosamente" };
  }
}
