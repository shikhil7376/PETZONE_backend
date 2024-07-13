import User from "../domain/user";
import UserRepository from "../infrastructure/repository/userRepository";
import OtpRepository from "../infrastructure/repository/otpRepsitory";


class UserUseCase{
    private UserRepository
    private OtpRepository
    constructor(
        UserRepository:UserRepository,
        OtpRepository:OtpRepository,
    ){
         this.UserRepository = UserRepository
         this.OtpRepository = OtpRepository
    }

    async checkExist(email:string){
        const userExist = await this.UserRepository.findByEmail(email)  
        if(userExist){
            return{
                status:400,
                data:{
                    status:false,
                    message:"User already exists"
                }
            }
        }else{
        return {
            status:200,
            data:{
                status:true,
                message:"User does not exist"
            }
        }
        }
    }
 async sendOtp(email:string){
    const otp = await this.OtpRepository.generateOtp(email)
    return{
        status:200,
        data:{
            status:true,
            message:"otp send",
            otp
        }
    }
 }
  
    
}


export default UserUseCase;