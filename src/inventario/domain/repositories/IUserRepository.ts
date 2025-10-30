import { Usuario } from "../model/Usuario";

export interface IUserRepository {
  findByEmail(email: string): Promise<Usuario | null>;
  save(user: Usuario): Promise<Usuario>;
}
