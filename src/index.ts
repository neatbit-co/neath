import * as express from "express";
import { AuthController } from "./auth";
import { useGoogle, GoogleController } from "./auth/google";
import * as passport from "passport";
import { config, schema } from "./config";
import { useJwt } from "./auth/jwt";
import { Connection } from "./database/connection";
import Logger from "./logger";
import { errorLogger, clientErrorHandler, errorHandler } from "./utils";

const dbConnection = new Connection();
dbConnection.start();

useJwt();
useGoogle();

const app: express.Application = express();
const port = config.get(nameof.full(schema.http.port, 1));

app.use(passport.initialize());
app.use("/", AuthController);
app.use("/google", GoogleController);

// Error logging and handling
app.use(errorLogger);
app.use(clientErrorHandler);
app.use(errorHandler);

app.listen(port, function () {
    Logger.info(`Neath is listening on port ${port}!`)
});