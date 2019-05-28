import { IsDefined } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ErrorMessages } from '../responses';

export class ResetPasswordDto {
  @IsDefined({ message: ErrorMessages.VALIDATION_MISSING_NEW_PASSWORD })
  @ApiModelProperty(
    {
      example: 'very secret password',
    },
  )
  password: string;

  @IsDefined({ message: ErrorMessages.VALIDATION_MISSING_TOKEN })
  @ApiModelProperty(
    {
      example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYmVydG9tYWxhdmVyN0BnbWFpbC5jb20iLCJzY29w',
    },
  )
  resetToken: string;
}
