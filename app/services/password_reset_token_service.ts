
import string from '@adonisjs/core/helpers/string'
import UserService from './user_service.js'
import PasswordResetToken from '../models/password_reset_token.js'
import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'

@inject()
export default class PasswordResetTokenService {

  constructor (protected userService: UserService) {}


  async generatePasswordResetToken() {
    const token =  string.random(32)
    return token
  }

  async createPasswordResetToken(userId: number, token: string, expiresAt: DateTime) {
    await PasswordResetToken.create({
      userId: userId,
      token: token,
      expires_at: expiresAt
    })
  }

  async checkToken(token: string) {
    const passwordResetToken = await PasswordResetToken.findBy('token', token)
    if (!passwordResetToken) {
      throw new Error('Token not found')
    }
    return passwordResetToken
  }

  async checkTokenExpiration(token: string) {
    const passwordResetToken = await this.checkToken(token)

    if (passwordResetToken.expires_at < DateTime.local()) {
      throw new Error('Token expired')
    }

    return passwordResetToken
  }

  async getUserByToken(token: string) {
    const passwordResetToken = await this.checkToken(token)
    const user = await this.userService.getUserById(passwordResetToken.userId)

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  async sendingPasswordResetEmail(payload: any) {

    const user = await this.userService.getUserByEmail(payload.email)
    const token = await this.generatePasswordResetToken()
    const expiresAt = DateTime.local().plus({ minutes: 15 })

    await this.createPasswordResetToken(user.id, token, expiresAt)

    // Send email with Link of Reseting Password

    return token
  }






}

