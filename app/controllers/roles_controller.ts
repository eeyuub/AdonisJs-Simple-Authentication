// import type { HttpContext } from '@adonisjs/core/http'

import { CheckRoleAttributes } from '#validators/role_validation'
import { HttpContext } from "@adonisjs/core/http"
import RoleService from "#services/role_service"
import { inject } from '@adonisjs/core'
import Role from '../models/role.js'
import { CrudService } from '../services/crud_service.js'

@inject()
export default class RolesController {

  private crudService: CrudService

  constructor(protected roleService: RoleService,
    ) {
      this.crudService = new CrudService(Role);
    }


  public async index({response}: HttpContext) {
    //const roles = await this.roleService.findAll()
    const roles = await this.crudService.all()
    return response.status(200).json(roles)
  }

  public async create({request,response}: HttpContext) {

    try{

      const payload = await CheckRoleAttributes.validate(request.body())
      const role = await this.roleService.create(payload)
      return response.status(201).json({ success: 'Role created', role })

    }catch(error) {
      return response.status(400).json({error: error.message})
    }

  }

  public async update({request, response}: HttpContext) {
    try{

      const id = request.param('id')
      const payload = await CheckRoleAttributes.validate(request.all())
      const role = await this.roleService.update(id, payload)
      return response.status(200).json({ success: 'Role updated', role })

    }catch(error) {
      return response.status(400).json({error: error.message})
    }
  }

  public async show({request, response}: HttpContext) {
    try{

      const id = request.param('id')
      const role = await this.roleService.findById(id)
      return response.status(200).json(role)

    }catch(error) {
      return response.status(400).json({error: error.message})
    }

  }

  public async showByRole({request, response}: HttpContext) {
    try{

      const roleParam = request.param('role')
      const role = await this.roleService.findByRole(roleParam)
      return response.status(200).json(role)

    }catch(error) {
      return response.status(400).json({error: error.message})
    }

  }

  public async getUsersByRoleName({request, response}: HttpContext) {
    try{

      const role = request.param('role')
      const users = await this.roleService.getUsersByRoleName(role)
      return response.status(200).json(users)

    }catch(error) {
      return response.status(400).json({error: error.message})
    }
  }

  public async delete({request, response}: HttpContext) {
    try{

      const id = request.param('id')
      await this.roleService.delete(id)
      return response.status(200).json({ success: 'Role deleted' })

    }catch(error) {
      return response.status(400).json({error: error.message})
    }
  }

}

