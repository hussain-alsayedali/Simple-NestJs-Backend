import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { SignupDto, SigninDto } from './dto';

@Controller('user-auth')
export class UserAuthController {
  constructor(private authService: UserAuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }
}
