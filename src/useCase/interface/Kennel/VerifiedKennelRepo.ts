import VerifiedKennelOwner from "../../../domain/verifiedKennelOwner";

interface verifiedKennelOwnerRepo{
   save(kennelOwner:any):Promise<VerifiedKennelOwner>
}

export default verifiedKennelOwnerRepo