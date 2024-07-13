import { Request,Response,NextFunction } from "express";
import UserUseCase from "../useCase/userUsecase";



class userController{
    private userUseCase
    constructor(userUseCase:UserUseCase){
        this.userUseCase = userUseCase
    }

    async signUp(req:Request,res:Response,next:NextFunction){
        try {
            const {name,email,password,phone} = req.body
          const verifyUser = await this.userUseCase.checkExist(email)
          if(!verifyUser.data.status){
            return res.status(verifyUser.status).json(verifyUser.data)
          }
         const sendOtp = await this.userUseCase.sendOtp(email)
          if(sendOtp){
            res.status(sendOtp.status).json(sendOtp.data)
          }
        
        } catch (error) {
            next(error)
        }
    }
}

export default userController