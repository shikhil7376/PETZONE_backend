import VerifiedKennelOwner from "../../../domain/verifiedKennelOwner";
import VerifiedKennelOwnerModel from "../../database/VerifiedKennelownerModel";
import verifiedKennelOwnerRepo from "../../../useCase/interface/Kennel/VerifiedKennelRepo";


class VerifiedkennelRepository implements verifiedKennelOwnerRepo{
   async save(kennelOwner: any): Promise<VerifiedKennelOwner> {
       const newKennelOwner = new VerifiedKennelOwnerModel(kennelOwner)
       const savedKennelOwner = await newKennelOwner.save()
       return savedKennelOwner

   }
   async findByEmail(email: string): Promise<VerifiedKennelOwner | null> {
       const verifiedkennelowner = await VerifiedKennelOwnerModel.findOne({email:email})
       return verifiedkennelowner
   }
}

export default VerifiedkennelRepository