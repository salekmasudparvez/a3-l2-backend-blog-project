
import {  Router } from 'express'
import { authController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { authValidation } from './authValidation'


const authRouter = Router()

authRouter.post('/register', validateRequest(authValidation.authValidationSchema), authController.registerUser)
authRouter.post('/login', validateRequest(authValidation.loginValidationSchema), authController.loginUser)


export default authRouter
