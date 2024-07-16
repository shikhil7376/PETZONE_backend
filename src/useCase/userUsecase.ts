import User from "../domain/user";
import UserRepository from "../infrastructure/repository/userRepository";
import EncryptPassword from "../infrastructure/services/bcryptPassword";
import GenerateOtp from "../infrastructure/services/generateOtp";
import EmailService from "../infrastructure/services/emailService";
import JWTTOKEN from "../infrastructure/services/generateToken";
class UserUseCase{
    private UserRepository
    private EncryptPassword
    private JwtToken
    private generateOtp
    private generateEmail
    constructor(
        UserRepository:UserRepository,
        encryptPassword:EncryptPassword,
        jwtToken:JWTTOKEN,
        genrateOtp:GenerateOtp,
        generateEmail:EmailService
    ){
         this.UserRepository = UserRepository
         this.EncryptPassword = encryptPassword
         this.JwtToken = jwtToken
         this.generateOtp = genrateOtp
         this.generateEmail = generateEmail
    }

    async  checkExist(email:string){
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
 
      async signup(name:string,email:string,password:string,phone:string){
        const otp = this.generateOtp.createOtp()
        const hashedPassword = await this.EncryptPassword.encryptPassword(password)
         await this.UserRepository.saveOtp(email,otp,name,phone,hashedPassword)
         this.generateEmail.sendOtp(email,otp)

         return {
            status:200,
            data:{
                status:true,
                message:'verification otp sent to your email'
            }
         }
      }
    
      async verifyOtp(email:string,otp:number){
         const otpRecord = await this.UserRepository.findOtpByEmail(email)
         let data:{name:string,email:string,password:string,phone:string,} = {
            name:otpRecord?.name,
            email:otpRecord?.email,
            password:otpRecord?.password,
            phone:otpRecord?.phone 
         }
         if(!otpRecord){
            return {status:400,message:'invalid or expired OTP'}
         }
         const now = new Date().getTime()
         const otpGeneratedAt = new Date(otpRecord.otpGeneratedAt).getTime()
         const otpExpiration = 2*60*1000
         if(now - otpGeneratedAt >otpExpiration){
            await this.UserRepository.deleteOtpByEmail(email)
            return {status:400, message:"OTP has expired"}
         }
         if(otpRecord.otp !==otp){
            return {status:400, message:'Invalid OTP'}
         }
         await this.UserRepository.deleteOtpByEmail(email)
         return {status:200,message:"OTP verified succesfully",data:data}
      }
 
  async verifyOtpUser(user:any){


    const newUser = {...user}
    const userData = await this.UserRepository.save(newUser)
    let data={
        _id:userData._id,
        name:userData.name,
        email:userData.email,
        phone:userData.phone,
        isBlocked:userData.isBlocked
    }
    const token = this.JwtToken.generateToken(userData._id,'user')
    return {
        status:200,
        data:data,
        message:'otp verified successfully',
        token
    }
  }
   

}


export default UserUseCase;