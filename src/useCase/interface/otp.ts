interface OtpRepo{
    generateOtp(email:string):Promise<string>;
    verifyOtp(email:string,otp:string):Promise<boolean>
}

export default OtpRepo