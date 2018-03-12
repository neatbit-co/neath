import * as express from "express";
import { AuthController } from "./auth";
import indexHtml from "./public/index.html";

const app: express.Application = express();

app.use("/", AuthController);

app.listen(3000, function () {
    console.log("Powered by FuseBox");
    console.log('Example app listening on port 3000!')
});