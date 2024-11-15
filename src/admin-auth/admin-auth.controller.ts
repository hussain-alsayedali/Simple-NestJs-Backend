import {
  Controller,
  Get,
  HttpCode,
  Post,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { AuthDto } from './dto';
import { AdminAuthService } from './admin-auth.service';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private authService: AdminAuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
