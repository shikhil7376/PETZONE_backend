 import express from 'express'
import KennelRepository from "../repository/Kennel/kennelRepository"
import KennelUseCase from "../../useCase/Kennel/kennelUsecase"
import kennelController from "../../adapters/kennelController"
import GenerateOtp from '../services/generateOtp'
import EncryptPassword from '../services/bcryptPassword'
import UserRepository from '../repository/userRepository'
import EmailService from '../services/emailService'
import JWTTOKEN from '../services/generateToken'


// services
const generateOtp = new GenerateOtp()
const encryptPassword = new EncryptPassword()
const generateEmail = new EmailService()
const jwtToken = new JWTTOKEN()

// repositories
const kennelRepository = new KennelRepository()
const userRepository = new UserRepository()

//usecases
const kennelUsecase = new KennelUseCase(kennelRepository,generateOtp,encryptPassword,userRepository,generateEmail,jwtToken)

// controllers
const kennelcontroller = new kennelController(kennelUsecase)

const route = express.Router()

route.post('/sign_up',(req,res,next)=>kennelcontroller.signUp(req,res,next))
route.post('/verify',(req,res,next)=>kennelcontroller.verifyOtp(req,res,next))

export default route 