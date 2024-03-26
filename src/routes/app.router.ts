import { Application, Router } from 'express';
import BaseRouter from './base.router';
import AuthMiddleware from '@app/middleware/auth.middleware';
import ErrorHandlerMiddleware from '@app/middleware/error-handler.middleware';
import AuthRoutes from '@app/modules/auth/auth.routes';
import NoteRoutes from '@app/modules/note/note.routes';
import TestModuleRoutes from '@app/modules/dummy/dummy.routes';

class AppRoutes {
  private app: Application;
  private appRouter: Router;

  constructor(app: Application) {
    this.app = app;
    this.appRouter = Router();
  }

  public configureRoutes() {
    this.registerPreMiddleware();

    this.registerAppRouts();

    this.registerPostMiddleware();
  }

  private getAppRouters(): BaseRouter[] {
    // TODO: MOVE THIS ARRAY TO SEPARATE FILE
    return [
      new AuthRoutes(this.app),
      new NoteRoutes(this.app),
      new TestModuleRoutes(this.app),
      // ADD NEW ROUTERS HERE!
    ];
  }

  private registerPreMiddleware(): void {
    this.app.use(AuthMiddleware.authenticate);
  }

  registerAppRouts() {
    for (const router of this.getAppRouters()) {
      this.appRouter.use(router.getBase(), router.getRouter());
    }

    this.app.use(this.appRouter);
  }

  private registerPostMiddleware(): void {
    // Catch all route handler for 404 Not Found errors
    this.app.use(ErrorHandlerMiddleware.routeNotFound);
  }
}

export default AppRoutes;
