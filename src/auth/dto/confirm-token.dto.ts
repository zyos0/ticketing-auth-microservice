import { IsDefined } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ErrorMessages } from '../responses';

export class ConfirmTokenDto {
  @ApiModelProperty(
    {
      example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYmVydG9tYWxhdmVyN0BnbWFpbC5jb20iLCJzY29w',
    },
  )
  @IsDefined({ message: ErrorMessages.VALIDATION_MISSING_CONFIRM_TOKEN })
  confirmToken: string;
}
