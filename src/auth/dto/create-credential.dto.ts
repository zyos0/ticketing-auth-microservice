import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsDefined, IsEmail, IsIn, Matches } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ErrorMessages } from '../responses';

export class CreateCredentialDto {
  @IsDefined({ message: ErrorMessages.VALIDATION_MISSING_EMAIL })
  @IsEmail({}, { message: ErrorMessages.VALIDATION_INVALID_EMAIL })
  @ApiModelProperty(
    {
      example: 'user@mail.com',
    },
  )
  email: string;

  @IsDefined({ message: ErrorMessages.VALIDATION_MISSING_PASSWORD })
  @Matches(/^(?=.*[\d\W])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
    { message: ErrorMessages.VALIDATION_WEAK_PASSWORD })
  @ApiModelProperty(
    {
      example: 'very secret password',
    },
  )
  password: string;

  @IsArray({ message: ErrorMessages.VALIDATION_INVALID_SCOPE })
  @IsDefined({ message: ErrorMessages.VALIDATION_MISSING_SCOPE })
  @ArrayMaxSize(2, { message: ErrorMessages.VALIDATION_INVALID_SCOPE })
  @ArrayNotEmpty({ message: ErrorMessages.VALIDATION_INVALID_SCOPE })

  @IsIn(['event-managers', 'customer'], { message: 'Invalid Scope', each: true })
  @ApiModelProperty(
    {
      example: ['event-managers', 'customer'],
    },
  )
  scope: string[];
}
