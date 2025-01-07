
import config from '../../config';
import { ILogin, IUser } from './auth.interface'
import User from './auth.model'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUserFunc = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload)
  return result
}
const loginUserFunc = async (payload:ILogin) => {
   const isExitEmail = await User.findOne({email: payload.email})
   if(!isExitEmail){
    throw new Error('Invalid credentials')
   }
   if(isExitEmail.isBlocked){
    throw new Error('User is blocked')
   }
   const isPasswordMatched = await bcrypt.compare(payload.password, isExitEmail.password)
   if(!isPasswordMatched){
    throw new Error('Invalid credentials')
   }
   const userData = {
      _id: isExitEmail._id,
      name: isExitEmail.name,
      email: isExitEmail.email,
      role: isExitEmail.role,
      isBlocked: isExitEmail.isBlocked
   }
   const jwtSecret = config.jwt_secret || 'jwt_secret';
   
   const getToken = jwt.sign(userData, jwtSecret, {expiresIn: '1d'})

   const token = getToken;

   return {token}
}


export const authService = {
   registerUserFunc,
   loginUserFunc
 
}
