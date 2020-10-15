import 'dotenv/config';

import App from './app';
import WTFRoute from './routes/wtf.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([
  new WTFRoute(),
]);

(async () => {
  await app.initializeDB();
  app.listen();
})();
