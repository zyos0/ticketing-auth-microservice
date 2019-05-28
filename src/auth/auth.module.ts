import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchemas } from './schemas';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { secretKey } from './config';
import { Strategies } from './passport';
import { EmailService } from './email.service';

@Module({
  imports: [
    MongooseModule.forFeature(AuthSchemas),
    JwtModule.register({ secretOrPrivateKey: secretKey }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    ...Strategies,
    AuthService,
    EmailService,
  ],

})
export class AuthModule {

}
