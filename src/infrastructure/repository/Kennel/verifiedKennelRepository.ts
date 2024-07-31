import VerifiedKennelOwner from "../../../domain/verifiedKennelOwner";
import VerifiedKennelOwnerModel from "../../database/VerifiedKennelownerModel";
import verifiedKennelOwnerRepo from "../../../useCase/interface/Kennel/VerifiedKennelRepo";
import kennelModel from "../../database/cagesModel";
import kennel from "../../../domain/cages";


class VerifiedkennelRepository implements verifiedKennelOwnerRepo{
   async save(kennelOwner: any): Promise<VerifiedKennelOwner> {
       const newKennelOwner = new VerifiedKennelOwnerModel(kennelOwner)
       const savedKennelOwner = await newKennelOwner.save()
       return savedKennelOwner

   }
async getProfile(id: string): Promise<VerifiedKennelOwner | null> {
    const data = await VerifiedKennelOwnerModel.findOne({_id:id})
    return data
}

   async findByEmail(email: string): Promise<VerifiedKennelOwner | null> {
       const verifiedkennelowner = await VerifiedKennelOwnerModel.findOne({email:email})
       return verifiedkennelowner
   }
  
   async savekennel(user: kennel): Promise<kennel> {
       const newKennel = new kennelModel(user)
       const savedKennel = await newKennel.save()
       return savedKennel
   }
}

export default VerifiedkennelRepository