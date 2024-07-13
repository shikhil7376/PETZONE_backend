import express from 'express'
import UserRepository from '../repository/userRepository'
import UserUseCase from '../../useCase/userUsecase'
import UserController from '../../adapters/userController'
import OtpRepository from '../repository/otpRepsitory'


//services

// repositories
const userRepository = new UserRepository()
const otpRepository = new OtpRepository()
// useCases
const userCase  = new UserUseCase(userRepository,otpRepository)

// controllers
const userController = new UserController(userCase)

const route = express.Router()



route.post('/sign_up',(req,res,next)=>userController.signUp(req,res,next))


export default route