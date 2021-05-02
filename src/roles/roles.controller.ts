import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateRoleDTO } from './dto/create-role.dto'
import { RolesService } from './roles.service'

@ApiTags('Role')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDTO) {
    return this.rolesService.createRole(dto)
  }

  @Get(':value')
  getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value)
  }
}
