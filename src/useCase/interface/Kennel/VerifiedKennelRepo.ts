import VerifiedKennelOwner from "../../../domain/verifiedKennelOwner";
import kennel from "../../../domain/cages";

interface verifiedKennelOwnerRepo{
   save(kennelOwner:any):Promise<VerifiedKennelOwner>
   findByEmail(email:string):Promise<VerifiedKennelOwner|null>
   getProfile(id:string):Promise<VerifiedKennelOwner|null>
   savekennel(user:kennel):Promise<kennel>

}

export default verifiedKennelOwnerRepo