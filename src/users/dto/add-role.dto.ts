import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class AddRoleDTO {
  @ApiProperty({ example: 'ADMIN', description: 'Role to add' })
  @IsString({ message: 'Must be a string' })
  readonly role: string

  @ApiProperty({ example: 1, description: 'User id' })
  @IsNumber({}, {message: 'Must be a number'})
  readonly userId: number
}
