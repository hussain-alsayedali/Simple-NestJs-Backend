import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserAuthModule } from './user-auth/user-auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { TodoModule } from './todo/todo.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserAuthModule,
    UserModule,
    AdminModule,
    TodoModule,
    AdminAuthModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
