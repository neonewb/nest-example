import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class BanUserDTO {
  @ApiProperty({ example: 'Spam', description: 'Ban reason' })
  @IsString({ message: 'Must be a string' })
  readonly banReason: string

  @ApiProperty({ example: 1, description: 'User id' })
  @IsNumber({}, {message: 'Must be a number'})
  readonly userId: number
}
