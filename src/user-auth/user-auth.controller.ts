import { Controller, Post } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';

@Controller('user-auth')
export class UserAuthController {
  constructor(private authService: UserAuthService) {}

  @Post('signup')
  signup() {
    return this.authService.signup();
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
