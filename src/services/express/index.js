import express from "express";
import device from "express-device";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";
import { errorHandler as queryErrorHandler } from "querymen";
import { errorHandler as bodyErrorHandler } from "bodymen";
import { env, rateLimiter, i18nConfig } from "~/config";
import acl from "./acl";
import swagger from "./swagger";
import { doorman } from "s/auth/guard";
import i18n from "i18n";

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
// istanbul ignore next
const limiter = rateLimit(rateLimiter);

i18n.configure(i18nConfig);

export default (apiRoot, routes) => {
  const app = express();
  /* istanbul ignore next */

  if (env === "production" || env === "development") {
    app.use(helmet());
    app.use(limiter);
    app.use(cors());
    app.use(compression());
    app.use(morgan("dev"));
    app.use(device.capture({ parseUserAgent: true }));
  }
  if (env === "development") {
    app.use(swagger);
  }
  app.use(i18n.init);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(doorman);
  app.use(acl.authorize);
  app.use(apiRoot, routes);
  app.use(queryErrorHandler());
  app.use(bodyErrorHandler());

  return app;
};
