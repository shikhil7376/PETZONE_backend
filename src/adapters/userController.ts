import { Request,Response,NextFunction, response } from "express";
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

          if(verifyUser.data.status ==true && req.body.isGoogle){
            const user = await this.userUseCase.verifyOtpUser(req.body)
             return res.status(user.status).json(user)
           }

          if(verifyUser.data.status==true ){
            const sendOtp = await this.userUseCase.signup(
                name,
                email,
                password,
                phone,
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
        try {
            const {otp,email} = req.body
            let verify = await this.userUseCase.verifyOtp(email,otp)
            if(verify.status == 400){
                return res.status(verify.status).json({message:verify.message})
            }else if(verify.status ==200){
                let save = await this.userUseCase.verifyOtpUser(verify.data)
                if(save){
                    return res.status(save.status).json(save)
                }
            }
        } catch (error) {
            next(error)
        }
   }

   async resendOtp(req:Request,res:Response,next:NextFunction){
       try { 
        const {name,email,password,phone} = req.body
        const resendotp = await this.userUseCase.resendOtp(
            name,
            email,
            password,
            phone
        )
          if(resendotp.status==200){
             res.status(resendotp.status).json(resendotp.data.message)
          }
       } catch (error) {
          next(error)
       }
   }

   async login(req:Request,res:Response,next:NextFunction){
       try {
           const {email,password} = req.body
          
           
           const user = await this.userUseCase.login(email,password)
           return res.status(user.status).json(user.data)
       } catch (error) {
         next(error)
       }
   }
   
   async forgotPassword(req:Request,res:Response,next:NextFunction){
       try {
        const {email} = req.body
       
        
        const response = await this.userUseCase.forgotPassword(email)
        
        return res.status(response.status).json(response.data)
       } catch (error) {
        next(error)
       }
   }

   async verifyfotp(req:Request,res:Response,next:NextFunction){
       try {  
          const {otp,email} = req.body
       
          
          let verify = await this.userUseCase.verifyOtp(email,otp)
           if(verify.status==200){
            return res.status(verify.status).json(verify.data)
           }
       } catch (error) {
          next(error)
       }
   }
  
async verifyforgotResendotp(req:Request,res:Response,next:NextFunction){
    try {
        const {email} = req.body
        const response = await this.userUseCase.forgotResendOtp(email)
        if(response.status==200){
            res.status(response.status).json(response.data.message)
        }
        
    } catch (error) {
        next(error)
    }
}

async resetPassword(req:Request,res:Response,next:NextFunction){
    try {
         const {email,password} = req.body
         const changepassword = await this.userUseCase.resetPassword(email,password )
         return res.status(changepassword.status).json(changepassword.message)
    } catch (error) {
        next(error)
    }
}

async googleAuth(req:Request,res:Response,next:NextFunction){
  try {
    const {email,name} = req.body
    const verifyUser = await this.userUseCase.checkgoogleExist(email)
    if(verifyUser){
        const statusCode = verifyUser?.status || 500; 
        return res.status(statusCode).json(verifyUser);
    }
  } catch (error) {
    next(error)
  }
  
}

}



export default userController