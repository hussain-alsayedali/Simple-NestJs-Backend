import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto, EditTodoDto } from './dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  getTodos(userId: number) {
    return this.prisma.todo.findMany({
      where: {
        userId: userId,
      },
    });
  }

  getTodoById(userId: number, todoId: number) {
    return this.prisma.todo.findUnique({
      where: {
        userId: userId,
        id: todoId,
      },
    });
  }

  createTodo(userId: number, dto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: {
        userId: userId,
        ...dto,
      },
    });
  }

  editTodo(userId: number, todoId: number, dto: EditTodoDto) {
    return this.prisma.todo.update({
      where: {
        id: todoId,
        userId: userId,
      },
      data: {
        ...dto,
      },
    });
  }

  deleteTodo(userId: number, todoId: number) {
    return this.prisma.todo.delete({
      where: {
        userId: userId,
        id: todoId,
      },
    });
  }
}
