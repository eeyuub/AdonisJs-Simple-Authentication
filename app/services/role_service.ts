import { inject } from "@adonisjs/core"
import Role from "../models/role.js"


@inject()
export default class RoleService {

   async findByRole(role: string) {

    const role_payload = await Role.findBy('role', role)

    if(!role_payload) {
      throw new Error('Role not found')
    }

    return role_payload
  }

   async findById(id: number) {
    const role_payload = await Role.findBy('id', id)

    if(!role_payload) {
      throw new Error('Role not found')
    }

    return role_payload
  }

   async findAll() {
    return await Role.all()
  }

   async create(payload: any) {

    const isExist = await Role.findBy('role', payload.role)

    if(isExist) {
       throw new Error('Role already exists' )
    }

    const role = await Role.create({
      role: payload.role,
    })

    return role

}

   async update(id: number, payload: any) {

    const role = await Role.findBy('id', id)

    if(!role) {
      throw new Error('Role not found')
    }

    if(role.role === payload.role) {
         throw new Error('Role already exists')
    }

    role.role = payload.role

    return await role.save()

  }

   async delete(id: number) {
    const role = await Role.findBy('id', id)

    if(!role) {
      throw new Error('Role not found')
    }

    return await role.delete()
  }

   async getUsersByRoleName(role: string) {
    const role_payload = await Role.query().where('role', role).preload('users')

    if (!role_payload) {
      throw new Error('Role not found')
    }

    return role_payload
  }


}
