import User from "../models/user.js"
import hash from '@adonisjs/core/services/hash'

export class AuthService{


  /**
   * Handles the login functionality by verifying user credentials.
   * @param payload - Contains the email and password of the user trying to log in.
   * @returns An object containing the user's token and user details if authentication is successful.
   * @throws Error if the user does not exist or if the password does not match.
   */
  async login(payload: any) {

    const user = await User.findBy('email', payload.email)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    //console.log("Stored Hashed Password:", user.password); // Debugging output
    //console.log("Provided Password:", payload.password); // Debugging output
    const passwordsMatch =  await hash.verify(user.password, payload.password)
    //console.log("Passwords Match:", passwordsMatch); // Debugging output
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
  async register(payload: any) {

    const isExist = await User.findBy('email', payload.email)

    if (isExist) {
      throw new Error('User already exists')
    }

    const user = await User.create(payload)
    return user

  }

  async logout(auth: any) {
    const user = await auth.authenticate()
    if (!user) {
      throw new Error('Unauthorized')
    }
    await User.accessTokens.delete(user, user.currentAccessToken?.identifier!)
  }
}
