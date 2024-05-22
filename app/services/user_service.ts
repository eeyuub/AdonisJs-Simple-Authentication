import User from '#models/user'
import hash from '@adonisjs/core/services/hash'


export default class UserService {

  public static async login(payload: any) {

    const user = await User.findBy('email', payload.email)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const passwordsMatch =  await hash.verify(user.password, payload.password)
    if (!passwordsMatch) {
      throw new Error('Password or email mismatch')
    }

    const token = await User.accessTokens.create(user, ['*'],{ expiresIn: '1 hour' })
    return {token,user}
  }

  public static async register(payload: any) {

    const isExist = await User.findBy('email', payload.email)

    if (isExist) {
      throw new Error('User already exists')
    }

    const user = await User.create(payload)
    return user

  }


}

