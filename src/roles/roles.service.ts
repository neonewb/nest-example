import { CreateRoleDTO } from './dto/create-role.dto'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from './roles.model'

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}

  async createRole(dto: CreateRoleDTO) {
    const role = await this.roleModel.create(dto)
    return role
  }

  async getRoleByValue(value: string) {
    const role = await this.roleModel.findOne({ where: { role: value } })
    return role
  }
}
