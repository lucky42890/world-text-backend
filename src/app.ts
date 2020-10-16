import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';
import Route from './interfaces/route.interface';
import errorMiddleware from './middlewares/error.middleware';
import { connect } from './db/database';

class App {
  public app  : express.Application;
  public port : (string | number);
  public env  : boolean;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV === 'production' ? true : false;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  /**
   * Start server app
   */
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`✅️ App listening on the port ${this.port}`);
    });
  }

  /**
   * Get server object
   */
  public getServer() {
    return this.app;
  }

  /**
   * Connect to sqlite3 database
   */
  public async initializeDB() {
    await connect();
  }

  /**
   * Setup middlewares
   */
  private initializeMiddlewares() {
    if (this.env) {
      // For production mode
      this.app.use(logger('combined'));
      this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
    } else {
      // For development mode
      this.app.use(logger('dev'));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  /**
   * Initialize routes for the app
   * @param routes
   */
  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  /**
   * Setup error handling
   */
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
