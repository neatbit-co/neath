import { connect, connection } from "mongoose";
import Logger from "../logger";

const url = "mongodb://localhost:27017/neath";
export class Connection {
    async start(): Promise<void> {
        connection.on("error", Logger.error.bind(console, 'connection error:'));
        connection.once("open", function() {
            Logger.info("Connected to database");
        });
        await connect(url);
    }
}