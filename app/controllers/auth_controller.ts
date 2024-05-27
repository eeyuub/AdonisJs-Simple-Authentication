import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, loginUserValidator } from '#validators/user_validation'
import  UserService  from '#services/user_service'
import { inject } from '@adonisjs/core'
import { AuthService } from '../services/auth_service.js'
import User from '../models/user.js'
import { CrudService } from '../services/crud_service.js'

@inject()
export default class AuthController {


  protected crudService: CrudService

  constructor(protected userService: UserService,
     protected authService: AuthService
     )
  {
    this.crudService = new CrudService(User)
  }

  async register({ request, response }: HttpContext) {
    try {
      const payload = await createUserValidator.validateAsync(request.all())
      const user = await this.authService.register(payload)
      // Assuming sensitive data is handled within the UserService
      return response.status(201).json({
        success: 'User created successfully',
        user,
      })
    } catch (error) {
      // Handle different types of errors differently (e.g., validation error, duplicate user error)
      return response.status(400).json({ error: error.message })
    }
  }


  async login({ request, response }: HttpContext) {

    try {
      // Validate the user login input using loginUserValidator
      const payload = await loginUserValidator.validate(request.all())

      // Attempt to log the user in with the validated payload
      const result = await this.authService.login(payload)

      // If login is successful, send back the user details and token
      return response.status(200).json({
        success: 'User logged in',
        user: result.user,
        token: result.token.value!.release()  // Release the token value for use
      })

    } catch (error) {
      // If there's an error (e.g., invalid credentials), return an unauthorized status
      return response.status(401).json({ error: error.message })
    }
  }

  async logout({ auth, response }: HttpContext) {
    try{

      await this.authService.logout(auth)

      return response.status(200).json({
        success: 'User logged out successfully'
      })

    } catch (error) {
      // If there's an error (e.g., invalid credentials), return an unauthorized status
      return response.status(401).json({ error: error.message })
    }
  }

 /*  async passwordReset({ request, response }: HttpContext) {
    const payload = await passwordResetValidator.validate(request.all())
    const user = await this.userService.passwordReset(payload)
    return response.status(200).json({
      success: 'Password reset successfully',
      user
    })
  } */

  async getUser({ auth, response }: HttpContext) {
    const user = await this.userService.getUser(auth)
    return response.status(200).json({
      success: 'Logged user fetched successfully',
      user
    })
  }
}
