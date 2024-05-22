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

  async index({ request, response }: HttpContext) {

    return response.status(200).json({
      message: 'hello World'
    })
  }

  async login({ request, response }: HttpContext) {

    try {

      const payload = await loginUserValidator.validate(request.all())
      const result = await UserService.login(payload)

      return response.status(200).json({
        message: 'User logged in',
        user: result.user,
        token: result.token.value!.release()
      })

    } catch (error) {
      return response.status(401).json({ message: error.message })
    }

  }
}
