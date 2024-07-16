import User from "../../domain/user";
import UserModel from "../database/userModel";
import UserRepo from "../../useCase/interface/userRepo";
import OtpModel from "../database/otpModel";

class UserRepository implements UserRepo{

      async findByEmail(email: string): Promise<User | null> {
            const userData = await UserModel.findOne({email:email})
            return userData   
      }
     async saveOtp(email: string, otp: number, name: string, phone: string, password: string): Promise<any> {
           const otpDoc = new OtpModel({
            name:name,
            email:email,
            phone:phone,
            password:password,
            otp:otp,
            otpGeneratedAt: new Date()
           })
           const savedDoc = await otpDoc.save()
           return savedDoc
     }
     async findOtpByEmail(email: string): Promise<any> {
           return OtpModel.findOne({email}).sort({otpGeneratedAt:-1})
     }
     async deleteOtpByEmail(email: string): Promise<any> {
           return OtpModel.deleteOne({email})
     }
     async save(user: User): Promise<User> {
           const newUser = new UserModel(user)
           const savedUser = await newUser.save()
            return savedUser
     }

}


export default UserRepository