import { Repository } from "typeorm";
import { Compra } from "../../domain/model/Compra";
import { Usuario } from "../../domain/model/Usuario";
import { ICompraRepository } from "../../domain/repositories/ICompraRepository";
import { AppDataSource } from "../../../core/infrastructure/connection";

export class CompraRepositoryImpl implements ICompraRepository {
  
  private repo: Repository<Compra>;

  constructor() {
    this.repo = AppDataSource.getRepository(Compra);
  }

  async save(compra: Compra): Promise<Compra> {
    return await this.repo.save(compra);
  }

  async findAll(): Promise<Compra[]> {
    return await this.repo.find({
      relations: ["usuario", "detalles", "detalles.producto"],
      order: { fechaCompra: "DESC" },
    });
  }

  async findByUsuario(usuario: Usuario): Promise<Compra[]> {
    return await this.repo.find({
      where: { usuario: { id: usuario.id } },
      relations: ["detalles", "detalles.producto"],
      order: { fechaCompra: "DESC" },
    });
  }

   async findById(id: number): Promise<Compra | null> {
    const compra = await this.repo.findOne({
      where: { id },
      relations: ["usuario", "usuario.rol", "detalles", "detalles.producto"],
    });
    return compra || null;
  }
}
