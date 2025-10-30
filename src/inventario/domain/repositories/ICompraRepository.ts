import { Compra } from "../model/Compra";
import { Usuario } from "../model/Usuario";

export interface ICompraRepository {
  save(compra: Compra): Promise<Compra>;
  findAll(): Promise<Compra[]>;
  findByUsuario(usuario: Usuario): Promise<Compra[]>;
  findById(id: number): Promise<Compra | null>; 
}
