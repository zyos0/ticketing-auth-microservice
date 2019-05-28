import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IVerifyOptions, Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
      },
    );
  }

  async validate(username: string, password: string,
                 done: (error: any, user?: any, options?: IVerifyOptions) => void) {
    const currentCredential = await this.authService.getByEmail(username);
    const isGranted = currentCredential && await bcrypt.compare(password, currentCredential.password);
    if (!isGranted) {
      return done(new UnauthorizedException(), null);
    }
    if (currentCredential.resetToken) {
      currentCredential.resetToken = undefined;
      currentCredential.resetTokenExpiration = undefined;
      await currentCredential.save();
    }

    done(null, currentCredential.toObject());
  }
}
