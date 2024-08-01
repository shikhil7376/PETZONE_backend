import VerifiedKennelOwner from "../../../domain/verifiedKennelOwner";
import VerifiedKennelOwnerModel from "../../database/VerifiedKennelownerModel";
import verifiedKennelOwnerRepo from "../../../useCase/interface/Kennel/VerifiedKennelRepo";
import cages from "../../../domain/cages";
import Cage from "../../database/cagesModel";



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
 async savecage(data: cages): Promise<cages | null> {
    console.log('data',data);
    
     const newcage = new Cage(data) 
     const savedKennel = await newcage.save()
     return savedKennel
 }
 async getCages(): Promise<cages[] | null> {
    const cageList = await Cage.find();
    return cageList;
 }
}

export default VerifiedkennelRepository