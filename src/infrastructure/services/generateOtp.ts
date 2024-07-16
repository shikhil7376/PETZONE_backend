import OtpRepo from "../../useCase/interface/otp";


class GenerateOtp implements OtpRepo{
    createOtp(): number {
        return Math.floor(1000+ Math.random()* 9000)
    }
}

export default GenerateOtp