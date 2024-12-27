/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

const handleZodError = (err:any,res:Response) => {
     err.issues.map((item: any) => {
        return {
            path: item.path.join('>'),
            message: item.message
        }
    });

    res.status( StatusCodes.BAD_REQUEST).json({
        status: false,
        message: err.message,
        statusCode:StatusCodes.BAD_REQUEST,
        error: err,
        stack: err.stack  
    })

};

export default handleZodError;