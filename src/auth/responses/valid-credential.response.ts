import { ApiModelProperty } from '@nestjs/swagger';

export class ValidCredentialResponse {
  @ApiModelProperty(
    {
      example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYmVydG9tYWxhdmVyN0BnbWFpbC5jb20iLCJzY29w',
    },
  )
  token: string;
}
