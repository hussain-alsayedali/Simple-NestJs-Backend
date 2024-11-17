import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { Admin } from '@prisma/client';
import { GetAdmin } from 'src/admin-auth/decorator';
import { JwtAdminGuard } from 'src/admin-auth/guard';
import { AdminService } from './admin.service';

@UseGuards(JwtAdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get('me')
  getMe(@GetAdmin() admin: Admin) {
    return admin;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('todo/:id')
  deleteTodo(
    @GetAdmin('id') adminId: number,
    @Param('id', ParseIntPipe) todoId: number,
  ) {
    return this.adminService.deleteTodo(adminId, todoId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('user/:id')
  deleteUser(@Param('id', ParseIntPipe) userId: number) {
    return this.adminService.deleteUser(userId);
  }
}
