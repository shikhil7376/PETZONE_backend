import Otp from "../../domain/otp";
import OtpRepo from "../../useCase/interface/otp";
import crypto from 'crypto'
import OtpModel from "../database/otpModel";
import EmailService from "../services/emailService";


class OtpRepository implements OtpRepo{
    private emailService:EmailService;
          constructor(){
            this.emailService = new EmailService()
               }
     async generateOtp(email: string): Promise<string> {
         const otp = crypto.randomBytes(3).toString('hex')
         const otpData = new OtpModel({email,otp,createdAt:new Date()})
         await otpData.save()
         // send otp to email
         await this.emailService.sendOtp(email,otp)
         return otp
     }

    async verifyOtp(email: string, otp: string): Promise<boolean> {
        const otpData = await OtpModel.findOne({email,otp})as Otp & Document;
        if(!otpData){
            return false
        }
        const now = new Date()
        const diff = (now.getTime() - otpData.createdAt.getTime())/1000
        if(diff>600){
            await OtpModel.deleteOne({email,otp})
        }
        await OtpModel.deleteOne({email,otp})
        return true
    }
}


export default OtpRepository