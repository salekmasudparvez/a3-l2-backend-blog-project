import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utilittes/catchAsync";
import config from '../config';
import User from '../module/auth/auth.model';

const auth = (requiredRole: string) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
      throw new Error('Unauthorized');
    }
    const getAuthToken = token.split(" ")[1];
    const decodedToken = jwt.verify(getAuthToken, config.jwt_secret as string) as JwtPayload;

    const { email, role } = decodedToken;


    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error('User not found');
    }
    if (existingUser?.isBlocked === true) {
      throw new Error('This user is blocked  !')
    }

    if (role !== requiredRole) {
      throw new Error('Unauthorized');
    }

    req.existingUser = decodedToken as JwtPayload;

    next();
  });

export default auth;
