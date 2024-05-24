// import type { HttpContext } from '@adonisjs/core/http'

import { inject } from "@adonisjs/core"
import PasswordResetTokenService from "../services/password_reset_token_service.js"
import type { HttpContext } from '@adonisjs/core/http'
import { CheckPasswordResetSendingRequestAttributes, CheckPasswordResetAttributes } from "../validators/password_reset_validation.js"
import { PasswordService } from "../services/password_service.js"
@inject()
export default class PasswordResetTokensController {

  constructor(protected TokenService: PasswordResetTokenService, protected passwordService: PasswordService) {}

  async sendPasswordResetEmail({request,response}: HttpContext) {
    try{
      const payload = await CheckPasswordResetSendingRequestAttributes.validate(request.all())
      const token = await this.TokenService.sendingPasswordResetEmail(payload)
      return response.status(200).json({
        success: 'Password reset email sent',
        token:token
      })

    }catch(error){
      return response.status(400).json({
        error: error.message
      })
    }
  }

  async resetPassword({request, response}: HttpContext){
    try{
      const payload = await CheckPasswordResetAttributes.validate(request.all())
      const token = request.param('token')
      await this.TokenService.checkToken(token)
      await this.passwordService.checkOldPassword(token, payload.oldPassword)
      await this.passwordService.passwordResetByToken(token,payload)
      return response.status(200).json({
        success: 'Password reset successful'
      })
    }catch(error){
      return response.status(400).json({
        error: error.message
      })
    }
  }




}
