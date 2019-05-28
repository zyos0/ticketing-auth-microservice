import { ApiModelProperty } from '@nestjs/swagger';

export class JwtPayload {
  @ApiModelProperty(
    {
      example: 'user@mail.com',
    },
  )
  email: string;

  @ApiModelProperty(
    {
      example: ['event-managers', 'customer'],
    },
  )
  scope: string[];
}
