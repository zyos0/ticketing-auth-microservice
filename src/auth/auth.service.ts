import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CredentialInterface } from './schemas';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateCredentialDto } from './dto';
import { SecurityConf } from './config';

import * as nanoid from 'nanoid';
import { ErrorMessages } from './responses';

@Injectable()
export class AuthService {
  constructor(@InjectModel('Credential') private readonly credentialModel: Model<CredentialInterface>) {

  }

  async createCredential(createCredentialDto: CreateCredentialDto) {
    createCredentialDto.password = await bcrypt.hash(createCredentialDto.password, SecurityConf.saltRounds);
    const currentCredential = await this.getByEmail(createCredentialDto.email);
    const { scope } = createCredentialDto;
    if (currentCredential) {
      const isInScopes = currentCredential.scope.find(
        existing => !!scope.find(
          newest => newest === existing,
        ),
      );

      if (isInScopes) {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: ErrorMessages.ON_CREATE_CREDENTIAL_CONFLICT,
        }, HttpStatus.CONFLICT);
      }
      currentCredential.scope = currentCredential.scope.concat(scope);
      return await currentCredential.save();
    }

    const newCredential = {
      ...createCredentialDto,
      scope,
      confirmationToken: nanoid(),
      confirmationExpiration: new Date(Date.now() + SecurityConf.confirmExpiration),
    };

    return await this.credentialModel.create(newCredential);
  }

  async getByEmail(email: string) {
    return await this.credentialModel.findOne({ email }).exec();
  }

  async confirmCredential(confirmationToken: string) {
    const currentCredential = await this.credentialModel.findOne({ confirmationToken });
    if (!currentCredential) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: ErrorMessages.ON_CONFIRM_INVALID_TOKEN,
      }, HttpStatus.BAD_REQUEST);
    }

    if (currentCredential.confirmationExpiration.getTime() <= Date.now()) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: ErrorMessages.ON_CONFIRM_EXPIRED_TOKEN,
      }, HttpStatus.BAD_REQUEST);
    }

    currentCredential.confirmed = true;
    currentCredential.confirmationExpiration = undefined;
    currentCredential.confirmationToken = undefined;
    return await currentCredential.save();
  }

  async resendConfirmation(userId: string) {
    const credential = await this.credentialModel.findById(userId);
    if (credential.confirmed) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: ErrorMessages.ON_CONFIRM_CREDENTIAL_CURRENTLY_ACTIVE,
      }, HttpStatus.CONFLICT);
    }
    credential.confirmationToken = nanoid();
    credential.confirmationExpiration = new Date(Date.now() + SecurityConf.confirmExpiration);
    return await credential.save();
  }

  async setForgotPasswordToken(email: string) {
    const credential: CredentialInterface = await this.credentialModel.findOne({ email });
    if (!credential) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: ErrorMessages.ON_RESET_PASSWORD_REQUEST_EMAIL_NOT_FOUND,
      }, HttpStatus.NOT_FOUND);
    }
    credential.resetToken = nanoid();
    credential.resetTokenExpiration = new Date(Date.now() + SecurityConf.forgotExpiration);
    return await credential.save();
  }

  async resetPassword(resetToken: string, password: string) {
    const credential = await this.credentialModel.findOne({ resetToken });
    if (!credential) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: ErrorMessages.ON_PASSWORD_RESET_INVALID_TOKEN,
      }, HttpStatus.BAD_REQUEST);
    }

    if (credential.resetTokenExpiration.getTime() <= Date.now()) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: ErrorMessages.ON_PASSWORD_RESET_EXPIRED_TOKEN,
      }, HttpStatus.BAD_REQUEST);
    }
    credential.password = await bcrypt.hash(password, SecurityConf.saltRounds);
    credential.resetTokenExpiration = undefined;
    credential.resetToken = undefined;
    return await credential.save();
  }
}
