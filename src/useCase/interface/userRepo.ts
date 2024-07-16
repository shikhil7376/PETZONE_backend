import User from "../../domain/user";


interface UserRepo{
    findByEmail(email:string):Promise<User|null>
    saveOtp(email:string,otp:number,name:string,phone:string,password:string):Promise<any>
    findOtpByEmail(email:string):Promise<any>
    deleteOtpByEmail(email:string):Promise<any>
    save(user:User):Promise<User>
}


export default UserRepo