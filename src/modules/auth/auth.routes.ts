import BaseRouter from '@app/routes/base.router';
import AuthController from './auth.controller';

class AuthRoutes extends BaseRouter {
  protected override base = '/api/auth';

  protected override configureRoutes(): void {
    this.router.post('/register', AuthController.register);
    this.router.post('/login', AuthController.login);
  }
}

export default AuthRoutes;
