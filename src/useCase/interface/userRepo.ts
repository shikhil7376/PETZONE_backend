import User from "../../domain/user";


interface UserRepo{
    findByEmail(email:string):Promise<User|null>
}


export default UserRepo