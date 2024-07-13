interface Encrypt{
    encryptPassword(password:string):Promise<string>,
}

export default Encrypt