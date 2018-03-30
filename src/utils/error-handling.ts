import Logger from "../logger";
import { Request, Response } from "express";

const getError = (err: any) => (err.stack ? err.stack : err);

/**
 * Writes the error to the log.
 * 
 * @param err Error
 * @param req Request
 * @param res Response
 * @param next Next middleware
 */
export const errorLogger = (err: any, req: Request, res: Response, next: Function) => {
    Logger.error(`Unhandled exception: ${getError(err)}`);
    next(err);
};

/**
 * Handles errors from client side by returning a JSON error response with status code 500.
 * 
 * @param err Error
 * @param req Request
 * @param res Response
 * @param next Next middleware
 */
export const clientErrorHandler = (err: any, req: Request, res: Response, next: Function) => {
    if (req.xhr) {
        res.status(500).send({
            error: err
        });
    } else {
        next(err);
    }
};

/**
 * Catch-all error handler that takes care of any unhandled errors
 * by returning a formatted string with status code 500.
 * 
 * @param err Error
 * @param req Request
 * @param res Response
 * @param next Next middleware
 */
export const errorHandler = (err: any, req: Request, res: Response, next: Function) => {
    res.status(500);
    res.send(`An unexpected error has occurred: ${err}`);
};