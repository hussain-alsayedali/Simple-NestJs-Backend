import { Body, Controller, Post, Req, Request } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { AuthDto } from './dto';

@Controller('user-auth')
export class UserAuthController {
  constructor(private authService: UserAuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
