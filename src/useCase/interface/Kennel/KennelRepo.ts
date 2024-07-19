import kennelOwner from "../../../domain/kennelOwner";


interface KennelRepo{
    findByEmail(email:string):Promise<kennelOwner|null>
}

export default KennelRepo