import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {

  @ApiModelProperty(
    {
      example: 'user@mail.com',
    },
  )
  email: string;

  @ApiModelProperty(
    {
      example: 'very secret password',
    },
  )
  password: string;

}
