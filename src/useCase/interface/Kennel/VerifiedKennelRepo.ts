import VerifiedKennelOwner from "../../../domain/verifiedKennelOwner";
import cages from "../../../domain/cages";

interface verifiedKennelOwnerRepo{
   save(kennelOwner:any):Promise<VerifiedKennelOwner>
   findByEmail(email:string):Promise<VerifiedKennelOwner|null>
   getProfile(id:string):Promise<VerifiedKennelOwner|null>
   savecage(data:cages):Promise<cages|null>
   getCages(): Promise<cages[] | null>;

}

export default verifiedKennelOwnerRepo