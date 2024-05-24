import { inject } from "@adonisjs/core"
import UserService from "./user_service.js"
import hash from "@adonisjs/core/services/hash"
import PasswordResetTokenService from "./password_reset_token_service.js"


@inject()
export class PasswordService {

  constructor(protected userService: UserService, protected tokenService: PasswordResetTokenService) {}

  async hashPassword(password: string) {
    return await hash.make(password)
  }

  async passwordResetByToken(token: string, payload: any) {
    const passwordResetToken = await this.tokenService.checkTokenExpiration(token)
    let user = await this.tokenService.getUserByToken(token)
    await this.checkNewPasswordAndConfirmation(payload)
    await this.userService.passwordReset(user, payload.newPassword)
    await passwordResetToken.delete()
  }

  async checkOldPassword(token: string, oldPassword: string) {
    const user = await this.tokenService.getUserByToken(token)
    const passwordsMatch =  await hash.verify(user.password, oldPassword)

    if (!passwordsMatch) {
      throw new Error('Old password is incorrect')
    }
  }

  async checkNewPasswordAndConfirmation(payload: any) {
    if (payload.newPassword !== payload.confirmePassword) {
      throw new Error('Password and confirmation do not match')
    }
  }
}

