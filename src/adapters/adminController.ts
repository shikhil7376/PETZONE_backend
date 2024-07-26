import { Request,Response,NextFunction } from "express";
import adminUseCase from "../useCase/adminUsecase";

class adminController{
    private AdminUseCase
     constructor(AdminUseCase:adminUseCase){
        this.AdminUseCase = AdminUseCase
     }
      async getUser(req:Request,res:Response,next:NextFunction){
         try {
             const page = parseInt(req.query.page as string)|| 1
             const limit = parseInt(req.query.limit as string) || 10
             const searchTerm = req.query.search as string || ''
            const users = await this.AdminUseCase.getUsers(page,limit,searchTerm)
            if(users.status==200){
                return res.status(users.status).json(users)
            }else{
                return res.status(users.status).json(users.message)
            }
         } catch (error) {
            next(error)
         }
     }

     async blockUser(req:Request,res:Response,next:NextFunction) {
        try {
            const result = await this.AdminUseCase.blockUser(req.body.userId)
            if(result.status ==200){
                return res.status(result.status).json(result.data.message)
            }
        } catch (error) {
            next(error)
        }
     }

     async UnBlockUser(req:Request,res:Response,next:NextFunction){
        try {
          
            
            const result = await this.AdminUseCase.unBlockUser(req.body.userId)
            if(result.status ==200){
                return res.status(result.status).json(result.data.message)
            }else{
                return res.status(result.status).json(result.data.message)
            }
        } catch (error) {
            next(error)
        }
     }

     async getKennelRequests(req:Request,res:Response,next:NextFunction){
        try { 
            const page = parseInt(req.query.page as string) || 1
            const limit = parseInt(req.query.limit as string) || 10
            const searchTerm = req.query.search as string || ''
            const requests = await this.AdminUseCase.getRequests(page,limit,searchTerm)
            if(requests.status ==200){
                return res.status(requests.status).json(requests)
            }else{
                return res.status(requests.status).json(requests.message)
            }
        } catch (error) {
            
        }
     }
  async approveKennel(req:Request,res:Response,next:NextFunction){
    try {  
        const approve = await this.AdminUseCase.approveKennel(req.body. userId)
        if(approve?.status ==401){
            return res.status(approve.status).json({message:approve.data.message})
        }
        if(approve?.status ==200){
            return res.status(approve.status).json({message:approve.data.message})
        }
    } catch (error) {
        next(error)
    }
  }
async rejectKennel(req:Request,res:Response,next:NextFunction){
  try {
         console.log('id',req.body.reqId);
         
      const reject = await this.AdminUseCase.rejectKennel(req.body. userId91)
    if(reject.status ==200){
        return res.status(reject.status).json({message:reject.data.message})
    }
  } catch (error) {
    next(error)
  }
}  

async getVerifiedKennelOwner(req:Request,res:Response,next:NextFunction){
    try {     
        const users = await this.AdminUseCase.getVerifiedKennelOwner()
         if(users.status==200){
            res.status(users.status).json(users)
         }else{
            res.status(users.status).json(users.message)
         }
    } catch (error) {
        
    }
}

async blockkennelOwner(req:Request,res:Response,next:NextFunction) {
    try {
        const result = await this.AdminUseCase.blockkennelowner(req.body.userId)
        if(result.status ==200){
            return res.status(result.status).json(result.data.message)
        }
    } catch (error) {
        next(error)
    }
 }

 async unblockkennelOwner(req:Request,res:Response,next:NextFunction) {
    try {
        const result = await this.AdminUseCase.unblockkennelowner(req.body.userId)
        if(result.status ==200){
            return res.status(result.status).json(result.data.message)
        }
    } catch (error) {
        next(error)
    }
 }

}




export default adminController