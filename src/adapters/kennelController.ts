import { Request,Response,NextFunction } from "express";
import KennelUseCase from "../useCase/Kennel/kennelUsecase";

class kennelController{
    private kennelusecase
    constructor(KennelUseCase:KennelUseCase){
       this.kennelusecase = KennelUseCase
    }

   async signUp(req:Request,res:Response,next:NextFunction){
    try {
        const {name,email,password,phone} = req.body
        const verifyKennel = await this.kennelusecase.checkExists(email)
        if(verifyKennel.data.status == true){
            const sendOtp = await this.kennelusecase.signup(
               name,
               email,
               password,
               phone
            )
            return res.status(sendOtp.status).json(sendOtp.data)
        }else{
            return res.status(verifyKennel.status).json(verifyKennel.data)
        }
    } catch (error) {
        next(error)
    }
   }
 
   async verifyOtp(req:Request,res:Response,next:NextFunction){
        try {
            const {email,otp} = req.body
            let verify = await this.kennelusecase.verifyOtp(email,otp)
            if(verify.status ==400){
                return res.status(verify.status).json({message:verify.message})
            }else if(verify.status ==200){
                let save = await this.kennelusecase.verifyKennelOwner(verify.data)
                if(save){
                    return res.status(save.status).json(save)
                }
            }
        } catch (error) {
            next(error)
        }
   }
  
   async login(req:Request,res:Response,next:NextFunction){
    try {
        const {email,password} = req.body 
        const user = await this.kennelusecase.login(email,password)
        return res.status(user.status).json(user.data)
    } catch (error) {
      next(error)
    }
}

async resendOtp(req:Request,res:Response,next:NextFunction){
    try { 
     const {name,email,password,phone} = req.body
     const resendotp = await this.kennelusecase.resendOtp(
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

async getProfile(req:Request,res:Response,next:NextFunction){
    try {
        const {Id} = req.body 
        const response = await this.kennelusecase.getProfile(Id) 
        return res.status(response.status).json(response.data)
    } catch (error) {
       next(error) 
    }
}

async addKennel(req:Request,res:Response,next:NextFunction){
    try {    
   
     console.log(req.body);
     const images = req.files as Express.Multer.File[];
     console.log(images);
     
     
     
    } catch (error) {
        next(error)
    }
}
}


export default kennelController