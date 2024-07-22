import approve from "../../domain/approve"


interface adminRepo{
    getUsers():Promise<{users:{}[]}>
    blockUser(userId:string):Promise<boolean>
    unBlockUser(userId:string):Promise<boolean>
    getkennelRequest():Promise<{}[]|null>
    approveKennelRequest(reqId:string):Promise<approve | boolean>
    rejectKennelRequest(reqId:string):Promise<{status:boolean;email:string}>
    getVerifiedKennelOwner():Promise<{}[]|null>
    blockKennelOwner(reqId:string):Promise<boolean>
    UnblockKennelOwner(reqId:string):Promise<boolean>
    
}


export default adminRepo