import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { secretKey } from '../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      secretOrKey: secretKey,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromHeader('token'),
    });
  }

  async validate(payload, done: (...args: any[]) => void) {
    done(false, payload);

  }

}
