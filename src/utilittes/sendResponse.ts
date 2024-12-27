

import { Response } from 'express';

interface Idata<T> {
   statusCode: number;
   message: string;
   success: boolean;
   result?: T | T[] | null ;
}
const sendResponse =<T> (res:Response,data:Idata<T>) => {

   res.status(data.statusCode).json({
      success: data.success,
      message: data.message,
      statusCode: data.statusCode,
      data: data?.result,
   })
};

export default sendResponse;
