import KennelRepository from "../../infrastructure/repository/Kennel/kennelRepository"
import GenerateOtp from "../../infrastructure/services/generateOtp"
import EncryptPassword from "../../infrastructure/services/bcryptPassword"
import UserRepository from "../../infrastructure/repository/userRepository"
import EmailService from "../../infrastructure/services/emailService"
import JWTTOKEN from "../../infrastructure/services/generateToken"
import VerifiedkennelRepository from "../../infrastructure/repository/Kennel/verifiedKennelRepository"

class KennelUseCase{
    private KennelRepository
    private GenerateOtp
    private EncryptPassword
    private UserRepository
    private generateEmail
    private JwtToken
    private verifiedkennelRepository
    constructor(
        KennalRepository:KennelRepository,
        GenerateOtp:GenerateOtp,
        EncryptPassword:EncryptPassword,
        UserRepository:UserRepository,
        generateEmail:EmailService,
        JwtToken:JWTTOKEN,
        verfiedKennelRepository:VerifiedkennelRepository
    ){
     this.KennelRepository = KennalRepository
     this.GenerateOtp = GenerateOtp
     this.EncryptPassword = EncryptPassword
     this.UserRepository = UserRepository
     this.generateEmail = generateEmail
     this.JwtToken = JwtToken
     this.verifiedkennelRepository =  verfiedKennelRepository
    }

    async checkExists(email:string){
        const kennelOwnerExists = await this.KennelRepository.findByEmail(email)
        if(kennelOwnerExists){
            return{
                status:400,
                data:{
                    status:false,
                    message:'kennel owner already exists'
                }
            }
        }else{
          return{
            status:200,
            data:{
                status:true,
                message:'kennel owner does not exists'
            }
          }

        }
    }

    async signup(name:string,email:string,password:string,phone:string){
        const otp = this.GenerateOtp.createOtp()
        const hashedPassword = await this.EncryptPassword.encryptPassword(password)
        await this.UserRepository.saveKennelOtp(name,email,hashedPassword,phone,otp)
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
      const otpRecord = await this.UserRepository.findKennelOtpByEmail(email)
      let data:{name:string;email:string;phone:string;password:string} =
      {
        name:otpRecord.name,
        email:otpRecord.email,
        phone:otpRecord.phone,
        password:otpRecord.password
      } 
      if(!otpRecord){
        return {status:400, message:'Invalid or expired OTP'}
      }
     const now = new Date().getTime()
     const otpGeneratedAt = new Date(otpRecord.otpGeneratedAt).getTime()
     const otpExpiration = 2 * 60 * 1000; 
     console.log(`Now: ${now}, OTP Generated At: ${otpGeneratedAt}, Difference: ${now - otpGeneratedAt}`);

     if(now - otpGeneratedAt > otpExpiration){
        await this.UserRepository.deleteKennelOtpByEmail(email)
        return {status:400,message:'OTP has expired'}
     }
     if(otpRecord.otp!==otp){
        return {status:400,message:'Invalid OTP'}
     }
     await this.UserRepository.deleteKennelOtpByEmail(email)
     return {status:200,message:'OTP verified successfully',data:data}
   } 

   async verifyKennelOwner(kennelOwner:any){
      const newKennelOwner = {...kennelOwner}
      const kennelOwnerData = await this.KennelRepository.save(newKennelOwner)
      let data={
          _id:kennelOwnerData._id,
          name:kennelOwnerData.name,
          email:kennelOwnerData.email,
          isApproved:kennelOwnerData.isApproved,
          isBlocked:kennelOwnerData.isBlocked,
    }
    const token = this.JwtToken.generateToken(kennelOwnerData._id,'kennelOwner')
    return {
        status:200,
        data:data,
        message:'OTP verified succesfully',
        token
    }
   }

   async login(email:string,password:string){
     const kennelOwner = await this.verifiedkennelRepository.findByEmail(email)
      if(kennelOwner){
        let data = {
            _id:kennelOwner._id,
            name:kennelOwner.name,
            email:kennelOwner.email,
            password:kennelOwner.password,
            phone:kennelOwner.phone
        }
        if(kennelOwner.isBlocked){
            return{
                status:400,
                data:{
                    status:false,
                    message:'you have been blocked by admin',
                    token:''
                }
            }
        }
        const passworMatch = await this.EncryptPassword.compare(password,kennelOwner.password)
        if(passworMatch){
            let token = this.JwtToken.generateToken(kennelOwner._id,'verifiedkennelowner')
            return {
                status:200,
                data:{
                    status:true,
                    message:kennelOwner,
                    token
                }
            }
        }else{
            return {
                status:400,
                data:{
                    status:false,
                    message:'invalid email or password',
                    token:''
                }
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
   }
}

export default KennelUseCase 