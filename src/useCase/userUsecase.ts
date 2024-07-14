import User from "../domain/user";
import UserRepository from "../infrastructure/repository/userRepository";
import OtpRepository from "../infrastructure/repository/otpRepsitory";
import JWTTOKEN from "../infrastructure/services/generateToken";

class UserUseCase{
    private UserRepository
    private OtpRepository
    constructor(
        UserRepository:UserRepository,
        OtpRepository:OtpRepository,
        JwtToken:JWTTOKEN
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
        }
    }
 }
  
  async verifyOtp(email:string,otp:string){
    const isVerified = await this.OtpRepository.verifyOtp(email,otp)
    if(!isVerified){
        return {
            status:400,
            data:{
                status:false,
                message:'invalid or expired otp'
            }
        }
    }
    return {
        status:200,
        data:{
            status:true,
            message:'otp verified'
        }
    }
  }
}


export default UserUseCase;