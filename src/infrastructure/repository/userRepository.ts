import User from "../../domain/user";
import UserModel from "../database/userModel";
import UserRepo from "../../useCase/interface/userRepo";

class UserRepository implements UserRepo{

      async findByEmail(email: string): Promise<User | null> {
            const userData = await UserModel.findOne({email:email})
            return userData   
      }
}


export default UserRepository