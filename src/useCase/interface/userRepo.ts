import User from "../../domain/user";


interface UserRepo{
    findByEmail(email:string):Promise<User|null>
    saveOtp(name:string,email:string,password:string,phone:string,otp:number):Promise<any>
    saveKennelOtp(name:string,email:string,password:string,phone:string,otp:number):Promise<any>
    findOtpByEmail(email:string):Promise<any>
    findKennelOtpByEmail(email:string):Promise<any>
    deleteOtpByEmail(email:string):Promise<any>
    deleteKennelOtpByEmail(email:string):Promise<any>
    save(user:User):Promise<User>
}


export default UserRepo