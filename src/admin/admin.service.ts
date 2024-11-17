import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  deleteTodo(adminId: number, TodoId: number) {
    return this.prisma.todo.update({
      where: {
        id: TodoId,
      },
      data: {
        deleted: true,
        deletedByid: adminId,
      },
    });
  }
  deleteUser(userId: number) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        deleted: true,
      },
    });
  }
}
