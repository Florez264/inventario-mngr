import { Repository } from "typeorm";
import { AppDataSource } from "../../../core/infrastructure/connection";
import { Usuario } from "../../domain/model/Usuario";
import { Rol } from "../../domain/model/Rol";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  private readonly repo: Repository<Usuario>;

  constructor() {
    this.repo = AppDataSource.getRepository(Usuario);
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.repo.findOne({
      where: { email },
      relations: ["rol"],
    });
  }

  async save(user: Usuario): Promise<Usuario> {
    return await this.repo.save(user);
  }

  async findRoleByName(nombre: string): Promise<Rol | null> {
    const rolRepo = AppDataSource.getRepository(Rol);
    return await rolRepo.findOne({ where: { nombre } });
  }
}
