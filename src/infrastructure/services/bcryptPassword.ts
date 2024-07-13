import bcrypt from 'bcrypt'
import Encrypt from '../../useCase/interface/encryptPassword'


class EncryptPassword implements Encrypt{
    async encryptPassword(password: string): Promise<string> {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password,salt)
      return hash
    }
}


export default EncryptPassword