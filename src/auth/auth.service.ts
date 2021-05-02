import { User } from 'src/users/users.model'
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDTO } from 'src/users/dto/create-user.dto'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDTO) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(dto: CreateUserDTO) {
    const candidate = await this.userService.getUserByEmail(dto.email)
    if (candidate) {
      throw new HttpException('Email already used', HttpStatus.BAD_REQUEST)
    }
    const hashedPassword = await bcrypt.hash(dto.password, 5)
    const user = await this.userService.createUser({
      ...dto,
      password: hashedPassword
    })
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles }
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(dto: CreateUserDTO) {
    const user = await this.userService.getUserByEmail(dto.email)
    const passwordEquals = await bcrypt.compare(dto.password, user.password)

    if (user && passwordEquals) {
      return user
    }

    throw new UnauthorizedException({ message: 'Wrong email or password' })
  }
}
