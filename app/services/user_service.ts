import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

/**
 * UserService class provides static methods for user authentication processes,
 * including login and registration functionalities.
 */
export default class UserService {

  /**
   * Handles the login functionality by verifying user credentials.
   * @param payload - Contains the email and password of the user trying to log in.
   * @returns An object containing the user's token and user details if authentication is successful.
   * @throws Error if the user does not exist or if the password does not match.
   */
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

  /**
   * Handles user registration.
   * @param payload - Contains the user details such as email and password.
   * @returns The newly created user object.
   * @throws Error if a user with the same email already exists.
   */
  public static async register(payload: any) {

    const isExist = await User.findBy('email', payload.email)

    if (isExist) {
      throw new Error('User already exists')
    }

    const user = await User.create(payload)
    return user

  }


}


