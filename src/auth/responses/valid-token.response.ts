import { ApiModelProperty } from '@nestjs/swagger';

export class ValidTokenResponse {
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

  @ApiModelProperty(
    {
      example: false,
    },
  )
  confirmed: boolean;
}
