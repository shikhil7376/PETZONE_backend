import express from 'express'
import UserRepository from '../repository/userRepository'
import UserUseCase from '../../useCase/userUsecase'
import UserController from '../../adapters/userController'




// repositories
const userRepository = new UserRepository()

// useCases
const userCase  = new UserUseCase(userRepository)

// controllers
const userController = new UserController(userCase)

const route = express.Router()



route.post('/sign_up',(req,res,next)=>userController.signUp(req,res,next))


export default route