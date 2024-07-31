import mongoose from "mongoose";


interface cages{
    _id:string,
    kennelname:string,
    location:string,
    maxcount:number,
    phone:string,
    pricepernight:number,
    image:string[],
    currentBookings:string[],
    description:string,
    type:'small'|'medium'|'large'
    ownerId: mongoose.Schema.Types.ObjectId;
}

export default cages