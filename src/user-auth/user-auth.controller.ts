import { Body, Controller, Post, Req, Request } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { SignupDto, SigninDto } from './dto';

@Controller('user-auth')
export class UserAuthController {
  constructor(private authService: UserAuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }
}
