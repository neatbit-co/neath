import { createLogger, format, transports } from "winston";
import { config, schema } from './config';

const env = config.get(nameof.full(schema.env, 1));

const logger = createLogger({
    level: "debug",
    transports: [
        new transports.File({ filename: "neath.log", format: format.combine(format.timestamp(), format.json()) })
    ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (env !== "production") {
    logger.add(new transports.Console({
        format: format.simple()
    }));
}

export default logger;