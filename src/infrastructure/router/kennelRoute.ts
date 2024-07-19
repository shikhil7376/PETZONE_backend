 import express from 'express'
import KennelRepository from "../repository/Kennel/kennelRepository"
import KennelUseCase from "../../useCase/Kennel/kennelUsecase"
import kennelController from "../../adapters/kennelController"
import GenerateOtp from '../services/generateOtp'
import EncryptPassword from '../services/bcryptPassword'

// services
const generateOtp = new GenerateOtp()
const encryptPassword = new EncryptPassword()

// repositories
const kennelRepository = new KennelRepository()

//usecases
const kennelUsecase = new KennelUseCase(kennelRepository,generateOtp,encryptPassword)

// controllers
const kennelcontroller = new kennelController(kennelUsecase)

const route = express.Router()

route.post('/sign_up',(req,res,next)=>kennelcontroller.signUp(req,res,next))

export default route 