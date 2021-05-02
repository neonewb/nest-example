import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateRoleDTO {
  @ApiProperty({ example: 'ADMIN', description: 'Role to create' })
  @IsString({ message: 'Must be a string' })
  readonly role: string

  @ApiProperty({ example: 'Administrator', description: 'Role\'s description' })
  @IsString({ message: 'Must be a string' })
  readonly description: string
}
