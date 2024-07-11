import User from "../../domain/user";
import UserModel from "../database/userModel";
import UserRepo from "../../useCase/interface/userRepo";


class UserRepository implements UserRepo{
      async save(user: User): Promise<User> {
         const newUser = new UserModel(user) 
         const savedUser = await newUser.save()
         return savedUser;
      }

       async findByEmail(email: string): Promise<User | null> {
            const userData = await UserModel.findOne({email:email})
            return userData   
      }

      async findById(_id: string): Promise<User | null> {
          const userData = await UserModel.findById(_id);
          return userData
      }
}


export default UserRepository