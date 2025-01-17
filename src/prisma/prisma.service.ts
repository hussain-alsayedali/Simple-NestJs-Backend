import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  cleanDb() {
    return this.$transaction([
      this.user.deleteMany(),
      this.admin.deleteMany(),
      this.todo.deleteMany(),
    ]);
  }
}
