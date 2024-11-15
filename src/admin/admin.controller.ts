import { Controller, Get, UseGuards } from '@nestjs/common';
import { Admin } from '@prisma/client';
import { GetAdmin } from 'src/admin-auth/decorator';
import { JwtAdminGuard } from 'src/admin-auth/guard';

@UseGuards(JwtAdminGuard)
@Controller('admin')
export class AdminController {
  @Get('me')
  getMe(@GetAdmin() admin: Admin) {
    return admin;
  }
}
