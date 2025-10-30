import bcrypt from "bcryptjs";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { Usuario } from "../../domain/model/Usuario";
import { generateToken } from "../../../core/infrastructure/jwtUtils";

export class AuthService {
  
  private readonly userRepository: IUserRepository;

  constructor({ userRepository }: {
     userRepository: IUserRepository }) {
    this.userRepository = userRepository;
  }

  async register(nombre: string, email: string, password: string, rolNombre: string) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const rolRepo = (this.userRepository as any).findRoleByName
      ? await (this.userRepository as any).findRoleByName(rolNombre)
      : null;

    if (!rolRepo) {
      throw new Error(`El rol '${rolNombre}' no existe`);
    }

    const nuevoUsuario = new Usuario();
    nuevoUsuario.nombre = nombre;
    nuevoUsuario.email = email;
    nuevoUsuario.password = hashedPassword;
    nuevoUsuario.rol = rolRepo;

    return await this.userRepository.save(nuevoUsuario);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Contraseña incorrecta");
    }

    const token = generateToken({
      id: user.id,
      nombre: user.nombre,
      rol: user.rol.nombre,
      email: user.email,
    });

    return { token, user };
  }
}
