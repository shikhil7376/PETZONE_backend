import User from "../../domain/user";
import UserModel from "../database/userModel";
import UserRepo from "../../useCase/interface/userRepo";
import OtpModel from "../database/otpModel";

class UserRepository implements UserRepo{

      async findByEmail(email: string): Promise<User | null> {
            const userData = await UserModel.findOne({email:email})
            return userData   
      }
     async saveOtp(name: string,email: string,password: string, phone: string, otp: number): Promise<any> {          
           const otpDoc = new OtpModel({
            name:name,
            email:email,
            password:password,
            phone:phone,
            otp:otp,
            role:'user',
            otpGeneratedAt: new Date()
           })
           const savedDoc = await otpDoc.save()
           return savedDoc
     }

     async saveKennelOtp(name: string, email: string, password: string,phone:string,otp: number): Promise<any> {
           const otpDoc = new OtpModel({
            name:name,
            email:email,
            password:password,
            phone:phone,
            otp:otp,
            role:'kennelOwner',
            otpGeneratedAt: new Date()
           })
           const savedDoc = await otpDoc.save()
           return savedDoc
     }

     async findOtpByEmail(email: string): Promise<any> {
           return OtpModel.findOne({email,role:'user'}).sort({otpGeneratedAt:-1})
     }
     async findKennelOtpByEmail(email: string): Promise<any> {
           return OtpModel.findOne({email,role:'kennelOwner'}).sort({otpGeneratedAt:-1})
     }
     async deleteOtpByEmail(email: string): Promise<any> {
           return OtpModel.deleteMany({email,role:'user'})
     }
     async deleteKennelOtpByEmail(email: string): Promise<any> {
           return OtpModel.deleteOne({email,role:'kennelOwner'})
     }
     async save(user: User): Promise<User> {
           const newUser = new UserModel(user)
           const savedUser = await newUser.save()
            return savedUser
     }

}


export default UserRepository