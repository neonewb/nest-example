import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDTO } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() userDTO: CreateUserDTO) {
    return this.authService.login(userDTO)
  }

  @Post('reg')
  registration(@Body() userDTO: CreateUserDTO) {
    return this.authService.registration(userDTO)
  }
}
