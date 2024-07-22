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
        const otp =  this.generateOtp.createOtp()
        const hashedPassword = await this.EncryptPassword.encryptPassword(password)
         await this.UserRepository.saveOtp(name,email,hashedPassword,phone,otp)
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
        //  if(now - otpGeneratedAt >otpExpiration){
        //     await this.UserRepository.deleteOtpByEmail(email)
        //     return {status:400, message:"OTP has expired"}
        //  }
         if(otpRecord.otp !==otp){
            return {status:400, message:'Invalid OTP'}
         }
         await this.UserRepository.deleteOtpByEmail(email)
         return {status:200,message:"OTP verified succesfully",data:data}
      }
 
  async verifyOtpUser(user:any){
     if(user?.isGoogle){
        const hashedPassword = await this.EncryptPassword.encryptPassword(user.password)
        const newUser = {...user,password:hashedPassword}
        const userData = await this.UserRepository.save(newUser)
        let data = {
            _id:userData._id,
            name:userData.name,
            email:userData.email,
            phone:userData.phone,
            isBlocked:userData.isBlocked
        }
        const token = this.JwtToken.generateToken(userData._id, "user");

        return {
          status: 200,
          data: data,
          token,
        };
     }

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
 
  async login(email:string,password:string){
    const user = await this.UserRepository.findByEmail(email)
  
    
    let token = ''
    if(user){
        let data = {
            _id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            isBlocked:user.isBlocked
        }
        if(user.isBlocked){
            return{
                status:400,
                data:{
                    status:false,
                    message:'you have been blocked by admin',
                    token:''
                }
            }
        }
        const passwordMatch = await this.EncryptPassword.compare(password,user.password)
        if(passwordMatch && user.isAdmin){
            token = this.JwtToken.generateToken(user._id,"admin")
            return {
                status:200,
                data:{
                    status:true,
                    message:data,
                    token,
                    isAdmin:true
                }
            }
        }
        if(passwordMatch){
            token = this.JwtToken.generateToken(user._id,'user')
            return{
                status:200,
                data:{
                    status:true,
                    message:data,
                    token
                }
            }
        }else{
            return{
                status:400,
                data:{
                    status:false,
                    message:'invalid email or password',
                    token:''
                }
            }
        }
    }else{
        return {
            status: 400,
            data: {
              status: false,
              message: "Invalid email or password",
              token: "",
            },
          };
    }
  }
  

}


export default UserUseCase;