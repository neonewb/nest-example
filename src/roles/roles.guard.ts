import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'
import { User } from 'src/users/users.model'
import { ROLES_KEY } from '../auth/roles-auth.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass()
      ])
      if (!requiredRoles) {
        return true
      }

      const req = context.switchToHttp().getRequest()
      const authHeader = req.headers.authorization

      if (!authHeader) {
        throw new UnauthorizedException({ message: 'User is not authorized' })
      }

      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User is not authorized' })
      }

      const user: User = this.jwtService.verify(token)
      req.user = user

      const hasRequiredRole = user.roles.some((role) =>
        requiredRoles.includes(role.role)
      )

      if (hasRequiredRole) {
        return true
      }

      throw new HttpException('No access', HttpStatus.FORBIDDEN)
    } catch (e) {
      throw new HttpException('No access', HttpStatus.FORBIDDEN)
    }
  }
}
