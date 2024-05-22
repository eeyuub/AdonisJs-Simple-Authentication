import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, loginUserValidator } from '#validators/user_validation'
import  UserService  from '#services/user_service'


export default class AuthController {

  async register({ request, response }: HttpContext) {
    try {
      const payload = await createUserValidator.validate(request.all())
      const user = await UserService.register(payload)

      // Assuming sensitive data is handled within the UserService
      return response.status(201).json({
        message: 'User created successfully',
        user,
      })
    } catch (error) {
      // Handle different types of errors differently (e.g., validation error, duplicate user error)
      return response.status(400).json({ message: error.message })
    }
  }

  async index({ response }: HttpContext) {
    return response.status(200).json({
      message: 'hello World'
    })
  }

  async login({ request, response }: HttpContext) {

    try {
      // Validate the user login input using loginUserValidator
      const payload = await loginUserValidator.validate(request.all())

      // Attempt to log the user in with the validated payload
      const result = await UserService.login(payload)

      // If login is successful, send back the user details and token
      return response.status(200).json({
        message: 'User logged in',
        user: result.user,
        token: result.token.value!.release()  // Release the token value for use
      })

    } catch (error) {
      // If there's an error (e.g., invalid credentials), return an unauthorized status
      return response.status(401).json({ message: error.message })
    }
  }

}
