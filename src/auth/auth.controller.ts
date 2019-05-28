import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { CreateCredentialDto } from './dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './models';
import { emailTemplates, jwtConfig } from './config';
import { ConfirmTokenDto, ForgotPasswordDto, ResetPasswordDto } from './dto';
import { EmailService } from './email.service';
import { ApiImplicitHeader, ApiOperation, ApiResponse, ApiUnauthorizedResponse, ApiUseTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { ValidCredentialResponse, ValidTokenResponse } from './responses';
import { MessagePattern } from '@nestjs/microservices';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: EmailService,
    private readonly jwtService: JwtService,
  ) {

  }

  @Post('signup')
  @ApiOperation({ title: 'Creates a new credential' })
  @ApiResponse({ status: 201, description: 'The credential has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })

  async signup(@Body() createCredential: CreateCredentialDto) {
    const newCredentials = await this.authService.createCredential(createCredential);
    await this.mailService.sendMail(emailTemplates.CONFIRMATION_EMAIL, newCredentials.email, {
      email: newCredentials.email,
      token: newCredentials.confirmationToken,
    });

  }

  @HttpCode(200)
  @Post('login')
  @ApiOperation({ title: 'Login' })
  @ApiResponse({ status: 200, description: 'Login Successful', type: ValidCredentialResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard('local'))
  async login(@Req() { user }, @Body() login: LoginDto) {
    const payload: JwtPayload = { email: user.email, scope: user.scope };
    return { token: this.jwtService.sign(payload, jwtConfig) };
  }

  @Get('check-token')
  @HttpCode(200)
  @ApiOperation({ title: 'Check if token is valid' })
  @ApiImplicitHeader({ name: 'token', description: 'auth Token' })
  @ApiResponse({ status: 204, description: 'Valid Token', type: ValidTokenResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt'))
  @MessagePattern({ cmd: 'check-token' })
  async checkToken(@Req() { user }) {
    const validCredential = await this.authService.getByEmail(user.email);
    const { email, scope, confirmed } = validCredential;
    return { email, scope, confirmed };
  }

  @HttpCode(204)
  @Post('confirm')
  @ApiOperation({ title: 'Confirm a credential after its creation' })
  async confirmCredentials(@Body() confirmToken: ConfirmTokenDto) {
    await this.authService.confirmCredential(confirmToken.confirmToken);
  }

  @HttpCode(204)
  @Post('resend-activation')
  @ApiOperation({ title: 'Resend activation code' })
  @UseGuards(AuthGuard('local'))
  async ResendActivation(@Req() { user }, @Body() loginCredential: LoginDto) {
    const newCredentials = await this.authService.resendConfirmation(user._id);
    await this.mailService.sendMail(emailTemplates.CONFIRMATION_EMAIL, newCredentials.email, {
      email: newCredentials.email,
      token: newCredentials.confirmationToken,
    });
  }

  @HttpCode(204)
  @Post('forgot-password')
  @ApiOperation({ title: 'Request a forgot password email' })
  async forgotPassword(@Body() forgotPassword: ForgotPasswordDto) {
    const updatedCredential = await this.authService.setForgotPasswordToken(forgotPassword.email);
    if (updatedCredential) {
      await this.mailService.sendMail(emailTemplates.RESET_PASSWORD_EMAIL, updatedCredential.email, {
        email: updatedCredential.email,
        token: updatedCredential.resetToken,
      });
    }
  }

  @HttpCode(204)
  @Post('reset-password')
  @ApiOperation({ title: 'Set a new password' })
  async resetPassword(@Body() resetPassword: ResetPasswordDto) {
    await this.authService.resetPassword(resetPassword.resetToken, resetPassword.password);
  }
}
