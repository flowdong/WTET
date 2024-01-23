import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from '../decorator/skip-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @SkipAuth()
  @Post('login')
  async login(@Body() loginParams: any) {
    const value = await this.authService.loginSingToken(loginParams);
    return value;
  }
}
