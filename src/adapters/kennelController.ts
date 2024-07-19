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
        }
    } catch (error) {
        
    }
   }

}


export default kennelController