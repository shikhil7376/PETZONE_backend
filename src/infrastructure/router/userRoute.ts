import express from 'express'
import UserRepository from '../repository/userRepository'
import UserUseCase from '../../useCase/userUsecase'
import UserController from '../../adapters/userController'
import EncryptPassword from '../services/bcryptPassword'
import GenerateOtp from '../services/generateOtp'
import EmailService from '../services/emailService'
import JWTTOKEN from '../services/generateToken'


//services
 const generateOtp = new GenerateOtp()
 const encryptPassword = new EncryptPassword()
 const generateEmail = new EmailService()
 const jwtToken = new JWTTOKEN()
// repositories
const userRepository = new UserRepository()

// useCases
const userCase  = new UserUseCase(userRepository,encryptPassword,jwtToken,generateOtp,generateEmail)

// controllers
const userController = new UserController(userCase)

const route = express.Router()



route.post('/sign_up',(req,res,next)=>userController.signUp(req,res,next))
route.post('/verify',(req,res,next)=>userController.verifyOtp(req,res,next))
route.post('/resendotp',(req,res,next)=>userController.resendOtp(req,res,next))
route.post('/login',(req,res,next)=>userController.login(req,res,next))
route.post('/forgotpassword',(req,res,next)=>userController.forgotPassword(req,res,next))
export default route