import { Module } from '@nestjs/common';
import { AuthModule } from './user-auth/user-auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { TodoModule } from './todo/todo.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, AdminModule, TodoModule, AdminAuthModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
