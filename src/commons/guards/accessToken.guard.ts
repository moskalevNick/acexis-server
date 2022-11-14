import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new UnauthorizedException('user unauthorized');
      }
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('user unauthorized');
      }

      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      req.user = user;
      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('user unauthorized');
    }
  }
}
