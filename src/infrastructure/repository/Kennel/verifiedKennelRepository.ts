import VerifiedKennelOwner from "../../../domain/verifiedKennelOwner";
import VerifiedKennelOwnerModel from "../../database/VerifiedKennelownerModel";
import verifiedKennelOwnerRepo from "../../../useCase/interface/Kennel/VerifiedKennelRepo";
import cages from "../../../domain/cages";
import Cage from "../../database/cagesModel";
import booking from "../../../domain/Booking";
import Booking from "../../database/bookingModel";


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
     const newcage = new Cage(data) 
     const savedKennel = await newcage.save()
     return savedKennel
 }
 async getCages(): Promise<cages[] | null> {
    const cageList = await Cage.find();
    return cageList;
 }

async getSingleCage(id: string): Promise<cages | null> {
    const cage = await Cage.findById({_id:id})
    return cage
}

async savebooking(details: cages,userid:string, fromdate: string, todate: string, totalAmount: Number, totaldays: Number): Promise<booking | null> {

    
     const newbooking = new Booking({
        kennelname:details.kennelname,
        cageid:details._id,
        userid,
        fromdate,
        todate,
        totalamount:totalAmount,
        totaldays,
        ownerid:details.ownerId,
        transactionId:'1234'
     })
     const booking = await newbooking.save()
     const cagetemp = await Cage.findOne({_id:details._id})
     console.log('cagetempl',cagetemp);
     
     cagetemp?.currentBookings.push({bookingid:booking._id as string,fromdate:fromdate,todate:todate,userid:userid,status:booking.status})
     await cagetemp?.save();
     return booking
}

async getownerscages(id: string, page: number, limit: number, searchTerm: string): Promise<{ cage: {}[]; total: number; }> {
    const skip = (page - 1) * limit;
    const query = searchTerm ? 
    {
        ownerId: id,
        $or: [
            { kennelname: { $regex: searchTerm, $options: 'i' } },
            { location: { $regex: searchTerm, $options: 'i' } }
        ]
    } : 
    { ownerId: id };

    const cages = await Cage.find(query).skip(skip).limit(limit).lean();
    const total = await Cage.countDocuments(query);

    return { cage: cages, total };
}

async getCageById(id: string): Promise<cages | null> {
    const cage = await Cage.findById({_id:id})
    return cage
}
 
 async updatecage(id: string, data: cages): Promise<cages | null> {
    const updatedCage = await Cage.findByIdAndUpdate(id, data, { new: true });
    return updatedCage;
}

async findById(id: string): Promise<VerifiedKennelOwner | null> {
    const owner = await VerifiedKennelOwnerModel.findById({_id:id})
    return owner
}

async updateProfile(id: string, data: VerifiedKennelOwner): Promise<VerifiedKennelOwner | null> {
    const updatedProfile = await VerifiedKennelOwnerModel.findByIdAndUpdate(id,data,{new:true})
    return updatedProfile
}

}   

export default VerifiedkennelRepository