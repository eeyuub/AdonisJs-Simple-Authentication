// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from "@adonisjs/core/http"
import { registerUserValidator } from "../validators/user_validation.js"
import UserService from "../services/user_service.js"

export default class UsersController {

  constructor(protected userService: UserService) {
  }

  async index({ response }: HttpContext) {

    const users = await this.userService.getUsers()
    return response.status(200).json({
      success: 'Users fetched successfully',
      users
    })
  }

  async show({ request, response }: HttpContext) {

    const user = await this.userService.getUserById(request.param('id'))
    return response.status(200).json({
      success: 'User fetched successfully',
      user
    })
  }


  async create({ request, response }: HttpContext) {
    const payload = await registerUserValidator.validate(request.all())
    const user = await this.userService.create(payload)
    return response.status(200).json({
      success: 'User created successfully',
      user
    })
  }

  async update({ request, response }: HttpContext) {
    const payload = request.all()
    const user = await this.userService.updateUser(request.param('id'), payload)
    return response.status(200).json({
      success: 'User updated successfully',
      user
    })
  }

  async updatePassword({ request, response }: HttpContext) {
    const payload = request.all()
    const user = await this.userService.passwordReset(request.param('id'), payload.newPassword)
    return response.status(200).json({
      success: 'Password updated successfully',
      user
    })
  }
}

