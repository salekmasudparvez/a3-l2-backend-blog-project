

import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utilittes/catchAsync'
import sendResponse from '../../utilittes/sendResponse'
import { authService } from './auth.service'
import { Request, Response } from 'express'

const registerUser = catchAsync(async (req: Request, res: Response) => {

  const payload = req.body;
  const result = await authService.registerUserFunc(payload)

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: StatusCodes.CREATED,
    result: {
      _id: result._id,
      name: result.name,
      email: result.email,

    },
  }

  )
})
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await authService.loginUserFunc(payload);

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: StatusCodes.OK,
    result

  })
})
export const authController = {
  registerUser,
  loginUser

}
