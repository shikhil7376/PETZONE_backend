import { Request,Response,NextFunction } from "express";
import UserUseCase from "../useCase/userUsecase";



class userController{
    private userUseCase
    constructor(userUseCase:UserUseCase){
        this.userUseCase = userUseCase
    }

    async signUp(req:Request,res:Response,next:NextFunction){
        try {    
            const {email} = req.body
          const verifyUser = await this.userUseCase.checkExist(email)
          if(!verifyUser.data.status){
            return res.status(verifyUser.status).json(verifyUser.data)
          }
         const sendOtp = await this.userUseCase.sendOtp(email)
            return res.status(sendOtp.status).json(sendOtp.data)
        } catch (error) {
            next(error)
        }
    }
   
    async verifyOtp(req:Request,res:Response,next:NextFunction){
        try {
           
            
            const {email,otp} = req.body;
            const verifyOtp = await this.userUseCase.verifyOtp(email,otp)
            return res.status(verifyOtp.status).json(verifyOtp.data)
        } catch (error) {
           next(error)
        }
    }

}

export default userController