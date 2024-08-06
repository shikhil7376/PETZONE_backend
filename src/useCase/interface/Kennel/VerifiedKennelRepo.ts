import VerifiedKennelOwner from "../../../domain/verifiedKennelOwner";
import cages from "../../../domain/cages";
import booking from "../../../domain/Booking";

interface verifiedKennelOwnerRepo{
   save(kennelOwner:any):Promise<VerifiedKennelOwner>
   findByEmail(email:string):Promise<VerifiedKennelOwner|null>
   getProfile(id:string):Promise<VerifiedKennelOwner|null>
   savecage(data:cages):Promise<cages|null>
   getCages(): Promise<cages[] | null>;
   getSingleCage(id:string):Promise<cages|null>
   savebooking(details:cages,userid:string,fromdate:string,todate:string,totalAmount:Number,totaldays:Number,transactionId:string):Promise<booking|null>
   getownerscages(id:string):Promise<cages[]|null>
   getCageById(id:string):Promise<cages|null>
   updatecage(id:string,data:cages):Promise<cages|null>
}

export default verifiedKennelOwnerRepo