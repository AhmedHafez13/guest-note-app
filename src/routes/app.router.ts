import { Application, Request, Response, NextFunction, Router } from 'express';
import TestModuleRoutes from '@app/modules/dummy/dummy.routes';
import { NotFoundError } from '@app/error-handler/error.handlers';
import BaseRouter from './base.router';

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
      new TestModuleRoutes(this.app),
      // ADD NEW ROUTERS HERE!
    ];
  }

  private registerPreMiddleware(): void {}

  registerAppRouts() {
    for (const router of this.getAppRouters()) {
      this.appRouter.use(router.getBase(), router.getRouter());
    }

    this.app.use(this.appRouter);
  }

  private registerPostMiddleware(): void {
    // Catch all route handler for 404 Not Found errors
    this.app.use((_req: Request, _res: Response, next: NextFunction) => {
      const error = new NotFoundError(
        'Route not found or request method not allowed'
      );
      next(error);
    });
  }
}

export default AppRoutes;
