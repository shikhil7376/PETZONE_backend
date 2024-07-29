 import express from 'express'
import KennelRepository from "../repository/Kennel/kennelRepository"
import KennelUseCase from "../../useCase/Kennel/kennelUsecase"
import kennelController from "../../adapters/kennelController"
import GenerateOtp from '../services/generateOtp'
import EncryptPassword from '../services/bcryptPassword'
import UserRepository from '../repository/userRepository'
import EmailService from '../services/emailService'
import JWTTOKEN from '../services/generateToken'
import VerifiedkennelRepository from '../repository/Kennel/verifiedKennelRepository'
import { kennelAuth } from '../middleware/kennelAuth'
// services
const generateOtp = new GenerateOtp()
const encryptPassword = new EncryptPassword()
const generateEmail = new EmailService()
const jwtToken = new JWTTOKEN()

// repositories
const kennelRepository = new KennelRepository()
const userRepository = new UserRepository()
const verifiedkennelRepository = new VerifiedkennelRepository()

//usecases
const kennelUsecase = new KennelUseCase(kennelRepository,generateOtp,encryptPassword,userRepository,generateEmail,jwtToken,verifiedkennelRepository)

// controllers
const kennelcontroller = new kennelController(kennelUsecase)

const route = express.Router()

route.post('/sign_up',(req,res,next)=>kennelcontroller.signUp(req,res,next))
route.post('/verify',(req,res,next)=>kennelcontroller.verifyOtp(req,res,next))
route.post('/login',(req,res,next)=>kennelcontroller.login(req,res,next))
route.post('/resendotp',(req,res,next)=>kennelcontroller.resendOtp(req,res,next))
route.post('/getprofile',kennelAuth,(req,res,next)=>kennelcontroller.getProfile(req,res,next))

export default route 