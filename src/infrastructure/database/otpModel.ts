import mongoose,{Model,Document,Schema}  from "mongoose";
import Otp from "../../domain/otp";


const otpSchema:Schema = new Schema<Otp>({
    email:{
      type:String,
      required:true
    },
    otp:{
      type:String,
      required:true
    },
    createdAt:{
      type:Date,
      required:true,
      default:Date.now(),
      expires:600
    }
})

const OtpModel:Model<Otp|Document> = mongoose.model<Otp|Document>("Otp",otpSchema)

export default OtpModel