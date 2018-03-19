import * as express from "express";
import { AuthController } from "./auth";
import { useGoogle, GoogleController } from "./auth/google";
import * as passport from "passport";
import { config, schema } from "./config";
import { useJwt } from "./auth/jwt";

useJwt();
useGoogle();

const app: express.Application = express();
const port = config.get(nameof.full(schema.http.port, 1));

app.use(passport.initialize());
app.use("/", AuthController);
app.use("/google", GoogleController);

app.listen(port, function () {
    console.log(`Neath is listening on port ${port}!`)
});