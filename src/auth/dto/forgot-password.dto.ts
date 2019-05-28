import { IsDefined, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ErrorMessages } from '../responses';

export class ForgotPasswordDto {
  @IsDefined({ message: 'Must provide an email' })
  @IsEmail({}, { message: ErrorMessages.VALIDATION_INVALID_EMAIL })
  @ApiModelProperty(
    {
      example: 'user@mail.com',
    },
  )
  email: string;
}
