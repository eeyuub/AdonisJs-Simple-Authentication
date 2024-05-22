// import type { HttpContext } from '@adonisjs/core/http'

import { CheckRoleAttributes } from '#validators/role_validation'
import { HttpContext } from "@adonisjs/core/http"
import RoleService from "#services/role_service"

export default class RolesController {


  public async index({response}: HttpContext) {
    const roles = await RoleService.findAll()
    return response.status(200).json(roles)
  }

  public async create({request,response}: HttpContext) {

    try{

      const payload = await CheckRoleAttributes.validate(request.body())
      const role = await RoleService.create(payload)
      return response.status(201).json({ success: 'Role created', role })

    }catch(error) {
      return response.status(400).json({error: error.message})
    }

  }

  public async update({request, response}: HttpContext) {
    try{

      const id = request.param('id')
      const payload = await CheckRoleAttributes.validate(request.all())
      const role = await RoleService.update(id, payload)
      return response.status(200).json({ success: 'Role updated', role })

    }catch(error) {
      return response.status(400).json({error: error.message})
    }
  }

  public async show({request, response}: HttpContext) {
    try{

      const id = request.param('id')
      const role = await RoleService.findById(id)
      return response.status(200).json(role)

    }catch(error) {
      return response.status(400).json({error: error.message})
    }

  }

  public async showByRole({request, response}: HttpContext) {
    try{

      const roleParam = request.param('role')
      const role = await RoleService.findByRole(roleParam)
      return response.status(200).json(role)

    }catch(error) {
      return response.status(400).json({error: error.message})
    }

  }

  public async getUsersByRoleName({request, response}: HttpContext) {
    try{

      const role = request.param('role')
      const users = await RoleService.getUsersByRoleName(role)
      return response.status(200).json(users)

    }catch(error) {
      return response.status(400).json({error: error.message})
    }
  }

  public async delete({request, response}: HttpContext) {
    try{

      const id = request.param('id')
      await RoleService.delete(id)
      return response.status(200).json({ success: 'Role deleted' })

    }catch(error) {
      return response.status(400).json({error: error.message})
    }
  }

}

