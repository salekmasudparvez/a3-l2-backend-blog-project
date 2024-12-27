import { Response } from "express";
import { StatusCodes } from "http-status-codes";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleAuthError = (err: any, res: Response) => {
    res.status(StatusCodes.UNAUTHORIZED).json({
        status: false,
        message: err.message,
        statusCode: StatusCodes.UNAUTHORIZED,
        error: err,
        stack: err.stack
    })
}