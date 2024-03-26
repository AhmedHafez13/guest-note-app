import express, { Express } from 'express';
import passport from 'passport';
import morgan from 'morgan';
import 'express-async-errors';
import AppRoutes from './routes/app.router';
import JwtStrategy from './config/jwt-strategy.config';
import ErrorHandlerMiddleware from './middleware/error-handler.middleware';
import NotificationService from './services/notification.service';
import { GeneralNotificationChannels } from './config/notifications.config';

class Server {
  private app: Express;
  private port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 8080;
  }

  public async start(): Promise<void> {
    if (!(await this.connectToDatabase())) {
      process.exit();
    }

    this.setupLogger();
    this.setupNotifications();
    this.setupMiddleware();
    this.configureRoutes();
    this.setupErrorHandling();

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  private async connectToDatabase(): Promise<boolean> {
    // TODO: SETUP DATABASE CONNECTION
    // const databaseConfig = new DatabaseConfig();
    // return await databaseConfig.connect();
    return true;
  }

  private setupLogger(): void {
    this.app.use(morgan('combined'));
  }

  private setupNotifications(): void {
    NotificationService.registerChannels(GeneralNotificationChannels);
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    passport.use(JwtStrategy);
  }

  private configureRoutes(): void {
    new AppRoutes(this.app).configureRoutes();
  }

  private setupErrorHandling(): void {
    this.app.use(ErrorHandlerMiddleware.serverError);

    // TODO: Handle Unhandled Rejection
    process.on('unhandledRejection', (err) => {
      // TODO: LOG ERROR
      console.error('Unhandled Promise Rejection:', err);
      process.exit(1);
    });
  }
}

export default Server;
