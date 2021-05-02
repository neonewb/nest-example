import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDTO {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email address' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Must be a valid email' })
  readonly email: string

  @ApiProperty({ example: '12345678', description: 'Password' })
  @IsString({ message: 'Must be a string' })
  @Length(6, 50, { message: 'Length must be between 6 and 50' })
  readonly password: string
}
