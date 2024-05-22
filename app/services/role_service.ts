import Role from "../models/role.js"
import User from "../models/user.js"


export default class RoleService {

  public static async findByRole(role: string) {

    const role_payload = await Role.findBy('role', role)

    if(!role_payload) {
      throw new Error('Role not found')
    }

    return role_payload
  }

  public static async findById(id: number) {
    const role_payload = await Role.findBy('id', id)

    if(!role_payload) {
      throw new Error('Role not found')
    }

    return role_payload
  }

  public static async findAll() {
    return await Role.all()
  }

  public static async create(payload: any) {

    const isExist = await Role.findBy('role', payload.role)

    if(isExist) {
       throw new Error('Role already exists' )
    }

    const role = await Role.create({
      role: payload.role,
    })

    return role

}

  public static async update(id: number, payload: any) {

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

  public static async delete(id: number) {
    const role = await Role.findBy('id', id)

    if(!role) {
      throw new Error('Role not found')
    }

    return await role.delete()
  }

  public static async getUsersByRoleName(role: string) {
    const role_payload = await Role.query().where('role', role).preload('users')

    if (!role_payload) {
      throw new Error('Role not found')
    }

    return role_payload
  }


}
