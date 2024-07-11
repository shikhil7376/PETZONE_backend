import { Request,Response,NextFunction } from "express";
import UserUseCase from "../useCase/userUsecase";


class userController{
    private userUseCase:UserUseCase

    constructor(userUseCase:UserUseCase){
        this.userUseCase = userUseCase
    }

    async signUp(req:Request,res:Response,next:NextFunction){
        try {
          const verifyUser = await this.userUseCase.checkExist(req.body.email)
           if(verifyUser.data.status == true && req.body.isGoogle){
            
           }
        } catch (error) {
            next(error)
        }
    }
}

export default userController