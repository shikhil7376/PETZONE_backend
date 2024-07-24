import VerifiedKennelOwner from "../../../domain/verifiedKennelOwner";

interface verifiedKennelOwnerRepo{
   save(kennelOwner:any):Promise<VerifiedKennelOwner>
   findByEmail(email:string):Promise<VerifiedKennelOwner|null>
}

export default verifiedKennelOwnerRepo