import { ICompraRepository } from "../../domain/repositories/ICompraRepository";
import { IProductoRepository } from "../../domain/repositories/IProductoRepository";
import { Compra } from "../../domain/model/Compra";
import { DetalleCompra } from "../../domain/model/DetalleCompra";
import { Usuario } from "../../domain/model/Usuario";

export class CompraService {
  private readonly compraRepository: ICompraRepository;
  private readonly productoRepository: IProductoRepository;

  constructor({ 
    compraRepository, 
    productoRepository 
  }: { 
    compraRepository: ICompraRepository; 
    productoRepository: IProductoRepository;
  }) {
    this.compraRepository = compraRepository;
    this.productoRepository = productoRepository;
  }

  async realizarCompra(usuario: Usuario, productos: { id: number; cantidad: number }[]) {
    const detalles: DetalleCompra[] = [];
    let total = 0;

    for (const item of productos) {
      const producto = await this.productoRepository.findById(item.id);
      if (!producto) {
        throw new Error(`Producto con ID ${item.id} no encontrado`);
      }
      if (producto.cantidadDisponible < item.cantidad) {
        throw new Error(`Stock insuficiente para ${producto.nombre}`);
      }

      producto.cantidadDisponible -= item.cantidad;
      await this.productoRepository.update(producto);

      const detalle = new DetalleCompra();
      detalle.producto = producto;
      detalle.cantidad = item.cantidad;
      detalle.precioUnitario = Number(producto.precio);
      detalle.subtotal = Number(producto.precio) * item.cantidad;

      detalles.push(detalle);
      total += detalle.subtotal;
    }

    const compra = new Compra();
    compra.usuario = usuario;
    compra.fechaCompra = new Date();
    compra.total = total;
    compra.detalles = detalles;

    return await this.compraRepository.save(compra);
  }

  async historialPorCliente(usuario: Usuario) {
    return await this.compraRepository.findByUsuario(usuario);
  }

  async todasLasCompras() {
    return await this.compraRepository.findAll();
  }

  async obtenerFactura(id: number, usuario: Usuario) {
    const compra = await this.compraRepository.findById(id);
    
    if (!compra) {
      throw new Error("Factura no encontrada");
    }

    if (usuario.rol.nombre === "Cliente" && compra.usuario.id !== usuario.id) {
      throw new Error("No tienes permiso para ver esta factura");
    }

    return {
      factura: {
        numeroFactura: compra.id,
        fechaCompra: compra.fechaCompra,
        cliente: {
          id: compra.usuario.id,
          nombre: compra.usuario.nombre,
          email: compra.usuario.email,
        },
        productos: compra.detalles.map(detalle => ({
          id: detalle.producto.id,
          nombre: detalle.producto.nombre,
          numeroLote: detalle.producto.numeroLote,
          cantidad: detalle.cantidad,
          precioUnitario: Number(detalle.precioUnitario),
          subtotal: Number(detalle.subtotal),
        })),
        total: Number(compra.total),
      }
    };
  }
}