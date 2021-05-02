import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from 'src/roles/roles.model'
import { RolesService } from 'src/roles/roles.service'
import { AddRoleDTO } from './dto/add-role.dto'
import { BanUserDTO } from './dto/ban-user.dto copy'
import { CreateUserDTO } from './dto/create-user.dto'
import { User } from './users.model'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDTO) {
    const user = await this.userModel.create(dto)
    const role = await this.roleService.getRoleByValue('USER')
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user
  }

  async getAllUsers() {
    return await this.userModel.findAll({
      include: {
        model: Role,
        through: {
          attributes: []
        }
      }
    })
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({
      where: { email },
      include: { all: true }
    })
  }

  async addRole(dto: AddRoleDTO) {
    const user = await this.userModel.findByPk(dto.userId, {
      include: { all: true }
    })
    const role = await this.roleService.getRoleByValue(dto.role)
    if (user && role) {
      await user.$add('role', role.id)
      return user
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND)
  }

  async ban(dto: BanUserDTO) {
    const user = await this.userModel.findByPk(dto.userId, {
      include: { all: true }
    })
    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
    }
    user.banned = true
    user.banReason = dto.banReason
    await user.save()
    return user
  }
}
