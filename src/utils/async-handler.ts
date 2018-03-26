import { Request, Response } from "express";
import Logger from "../logger";
import { authenticate } from "passport";

export const asyncHandler = fn =>
    (req: Request, res: Response, next: any) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };