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
        
       const {kennelname,location,description,phone,type,maxCount,PricePerNight,ownerId} = req.body
       const data ={
        kennelname:kennelname,
        location:location,
        description:description,
        phone:phone,
        type:type,
        maxcount:maxCount,
        pricepernight:PricePerNight,
        ownerId:ownerId
       }
        const images =  req.files as Express.Multer.File[];
     const imagepath = images.map((val)=>val.path)  
     const response = await this.kennelusecase.addCage(data,imagepath)
     
    } catch (error) {
        next(error)
    }
}

async getCages(req:Request,res:Response,next:NextFunction){
    try {
        const data = await this.kennelusecase.getCages()                
       return  res.status(data.status).send(data.data)
    } catch (error) {
        next(error)
    }
}

async viewDetails(req:Request,res:Response,next:NextFunction){
    try {
        const {Id} = req.body
        const response = await this.kennelusecase.getSingleCage(Id) 
        return res.status(response.status).json(response.data)
    } catch (error) {
        next(error)
    }
}

async booking(req:Request,res:Response,next:NextFunction){
    try {          
        
       const{details,userid,fromdate,todate,totalAmount,totalDays,token} = req.body
       
        const response = await this.kennelusecase.booking(details,userid,fromdate,todate,totalAmount,totalDays,token)
        return res.status(response.status).json(response.message)
    } catch (error) {
        next(error)
    }
}

async getOwnersCage(req:Request,res:Response,next:NextFunction){
    try {
       const {Id} = req.body
        const response = await this.kennelusecase.getOwnersCage(Id)
        return res.status(response.status).json(response.data)
    } catch (error) {
        next(error)
    }
}

async editCage(req:Request,res:Response,next:NextFunction){
     try {
        
        const images =  req.files as Express.Multer.File[];
        console.log(images);
        
        
        
     } catch (error) {
        
     }
}

}




export default kennelController