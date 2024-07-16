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
          if(verifyUser.data.status==true){
            const sendOtp = await this.userUseCase.signup(
                name,
                email,
                phone,
                password
            )
            return res.status(sendOtp.status).json(sendOtp.data)
          }else{
            return res.status(verifyUser.status).json(verifyUser.data)
          }
        
        } catch (error) {
            next(error)
        }
    }
   async  verifyOtp(req:Request,res:Response,next:NextFunction){
        const {otp,email} = req.body
        let verify = await this.userUseCase.verifyOtp(email,otp)
        if(verify.status == 400){
            return res.status(verify.status).json({message:verify.message})
        }else if(verify.status ==200){
            let save = await this.userUseCase.verifyOtpUser(verify.data)
        }
   }
  
}

export default userController