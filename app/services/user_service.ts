import User from '#models/user'
import { inject } from '@adonisjs/core'


/**
 * UserService class provides static methods for user authentication processes,
 * including login and registration functionalities.
 */
@inject()
export default class UserService {

  async getUsers() {
    return User.all()
  }

  async create(payload: any) {

    const isExist = await User.findBy('email', payload.email)

    if (isExist) {
      throw new Error('User already exists')
    }

    const user = await User.create(payload)
    return user

  }

   async getUser(auth: any) {

    const user = await auth.authenticate()
    if (!user) {
      throw new Error('Unauthorized')
    }

    return user
  }

  async updateUser(id: number, updates: any) {
    const user = await User.find(id);
    if (!user) {
      throw new Error('User not found');
    }
    user.merge(updates);
    await user.save();
    return user;
  }

  async passwordReset(user: User, newPassword: string) {
    user.password = newPassword
    await user.save()
    return user
  }

  async getUserByEmail(email: string) {
    const user = await User.findBy('email', email)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  async getUserById(id: number) {
    const user = await User.find(id)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  async deleteUser(id: number) {
    const user = await User.find(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.delete();

  }


}


