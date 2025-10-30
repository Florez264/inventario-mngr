import { Producto } from "../model/Producto";

export interface IProductoRepository {
  findAll(): Promise<Producto[]>;
  findById(id: number): Promise<Producto | null>;
  save(producto: Producto): Promise<Producto>;
  update(producto: Producto): Promise<Producto>;
  delete(id: number): Promise<void>;
}
