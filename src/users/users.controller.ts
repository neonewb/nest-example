import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDTO } from './dto/create-user.dto'
import { User } from './users.model'
import { UsersService } from './users.service'
import { Roles } from 'src/auth/roles-auth.decorator'
import { RolesGuard } from 'src/roles/roles.guard'
import { AddRoleDTO } from './dto/add-role.dto'
import { BanUserDTO } from './dto/ban-user.dto copy'

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDTO: CreateUserDTO) {
    return this.usersService.createUser(userDTO)
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers()
  }

  @ApiOperation({ summary: 'Give a role' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('role')
  addRole(@Body() addRoleDto: AddRoleDTO) {
    return this.usersService.addRole(addRoleDto)
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('ban')
  banUser(@Body() banUserDto: BanUserDTO) {
    return this.usersService.ban(banUserDto)
  }
}
