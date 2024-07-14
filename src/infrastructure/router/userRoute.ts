import express from 'express'
import UserRepository from '../repository/userRepository'
import UserUseCase from '../../useCase/userUsecase'
import UserController from '../../adapters/userController'
import OtpRepository from '../repository/otpRepsitory'
import JWTTOKEN from '../services/generateToken'


//services
 const jwttoken = new JWTTOKEN()
// repositories
const userRepository = new UserRepository()
const otpRepository = new OtpRepository()
// useCases
const userCase  = new UserUseCase(userRepository,otpRepository,jwttoken)

// controllers
const userController = new UserController(userCase)

const route = express.Router()



route.post('/sign_up',(req,res,next)=>userController.signUp(req,res,next))
route.post('/verifyOtp',(req,res,next)=>userController.verifyOtp(req,res,next))

export default route