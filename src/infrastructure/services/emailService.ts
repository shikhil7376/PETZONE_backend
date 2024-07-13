import nodemailer from 'nodemailer'
import 'dotenv/config'

class EmailService{
    private transporter;
    constructor(){
      this.transporter = nodemailer.createTransport({
         service:"gmail",
         auth:{
            user:process.env.AUTH_EMAIL,
            pass:process.env.AUTH_PASS
         }
      })
    }
    async sendOtp(email:string,otp:string):Promise<void>{
        const mailOptions ={
            from:process.env.AUTH_EMAIL,
            to:email,
            subject:'Your OTP CODE',
            text:`Your OTP code is ${otp}`
        }
        await this.transporter.sendMail(mailOptions)
    }
}

export default EmailService