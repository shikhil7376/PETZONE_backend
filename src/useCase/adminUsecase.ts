import adminRepository from "../infrastructure/repository/adminRepository"
import VerifiedkennelRepository from "../infrastructure/repository/Kennel/verifiedKennelRepository"


class adminUseCase{
    private AdminRepo
    private VerifiedKennlRepo
    constructor(AdminRepo:adminRepository,KennelRepo:VerifiedkennelRepository){
      this.AdminRepo = AdminRepo
      this.VerifiedKennlRepo = KennelRepo
    }
    async getUsers(){
        const data = await this.AdminRepo.getUsers()
        console.log(data);
        
        if(data){
            return{
                status:200,
                data:data.users
            }
        }else{
            return {
                status:400,
                message:'failed to fetch data! please try again..'
            }
        }
    }

    async blockUser(userId:string){
        const result = await this.AdminRepo.blockUser(userId)
        if(result){
            return {
                status:200,
                data:{
                    status:true,
                    message:'blocked user successfully'
                }
            }
        }else{
            return{
                status:400,
                data:{
                    status:false,
                    message:'failed to block user! please try later'
                }
            }
        }
    }
    async unBlockUser(userId:string){
        const result = await this.AdminRepo.unBlockUser(userId)
        if(result){
            return {
                status:200,
                data:{
                    status:true,
                    message:'unblocked user succesfully'
                }
            }
        }else{
            return {
                status:400,
                data:{
                    status:false,
                    message:'failed to unblock user! please try later'
                }
            }
        }
    }

    async getRequests(){
        const requests = await this.AdminRepo.getkennelRequest()
        if(requests){
            return {
                status:200,
                data:requests,
                message:'get request data succesfully'
            }
        }else{
            return{
                status:400,
                message:'failed to fetch the data'
            }
        }
    }

    async approveKennel(reqId:string){
        const reqdata = await this.AdminRepo.approveKennelRequest(reqId)
        if(reqdata==false){
            return {
                status:401,
                    data:{
                        status:false,
                        message:'Acoount already exist'
                    }
            }
        }else if(reqId){
            let details = await this.VerifiedKennlRepo.save(reqdata)
            if(details){
                return {
                    status:200,
                    data:{
                        status:true,
                        message:'approved succesfully',
                        details
                    }
                }
            }
        }else{
           return{
            status:400,
            data:{
                status:false,
                message:'failed please try again!!'
            }
           }
        }
    }
    
    async rejectKennel(reqId:string){
        console.log('reqid',reqId);
        
        const reqData = await this.AdminRepo.rejectKennelRequest(reqId)
        if(reqData.status ==true){
            return{
                status:200,
                data:{
                    status:true,
                    message:'rejected succesfully',
                    email:reqData.email
                }
            }
        }else{
            return {
                status:400,
                data:{
                    status:false,
                    message:'please try again '
                }
            }
        }
    }

    async getVerifiedKennelOwner(){
        const verifiedkenneldata = await this.AdminRepo.getVerifiedKennelOwner()
         if(verifiedkenneldata){
          return{
            status:200,
            data:verifiedkenneldata,
            message:'succesfully fetched the verified kennelowner data'
          }  
         }else{
            return{
                status:400,
                message:'failed to fetch the data !! Try again'
            }
         }
    }
}

export default adminUseCase