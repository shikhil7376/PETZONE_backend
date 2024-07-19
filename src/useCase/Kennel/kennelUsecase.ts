import KennelRepository from "../../infrastructure/repository/Kennel/kennelRepository"
import GenerateOtp from "../../infrastructure/services/generateOtp"
import EncryptPassword from "../../infrastructure/services/bcryptPassword"
class KennelUseCase{
    private KennelRepository
    private GenerateOtp
    private EncryptPassword
    constructor(
        KennalRepository:KennelRepository,
        GenerateOtp:GenerateOtp,
        EncryptPassword:EncryptPassword
    ){
     this.KennelRepository = KennalRepository
     this.GenerateOtp = GenerateOtp
     this.EncryptPassword = EncryptPassword
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
        const hashedPassword = this.EncryptPassword.encryptPassword(password)
    }
}

export default KennelUseCase