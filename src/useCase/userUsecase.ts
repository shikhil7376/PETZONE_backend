import User from "../domain/user";
import UserRepository from "../infrastructure/repository/userRepository";



class UserUseCase{
    private UserRepository:UserRepository;
    constructor(UserRepository:UserRepository){
         this.UserRepository = UserRepository
    }

    async checkExist(email:string){
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
}


export default UserUseCase;