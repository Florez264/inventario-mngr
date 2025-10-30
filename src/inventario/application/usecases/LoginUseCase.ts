import { AuthService } from "../services/AuthService";

export class LoginUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(email: string, password: string) {
    return this.authService.login(email, password);
  }
}
