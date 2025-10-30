import { AuthService } from "../services/AuthService";

export class RegisterUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(nombre: string, email: string, password: string, rol: string) {
    return this.authService.register(nombre, email, password, rol);
  }
}
