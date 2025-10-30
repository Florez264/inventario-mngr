import { Repository } from "typeorm";
import { Producto } from "../../domain/model/Producto";
import { IProductoRepository } from "../../domain/repositories/IProductoRepository";
import { AppDataSource } from "../../../core/infrastructure/connection";

export class ProductoRepositoryImpl implements IProductoRepository {
  private repo: Repository<Producto>;

  constructor() {
    this.repo = AppDataSource.getRepository(Producto);
  }

  async findAll(): Promise<Producto[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<Producto | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async save(producto: Producto): Promise<Producto> {
    return await this.repo.save(producto);
  }

  async update(producto: Producto): Promise<Producto> {
    return await this.repo.save(producto);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
