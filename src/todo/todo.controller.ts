import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/user-auth/guard';
import { TodoService } from './todo.service';
import { GetUser } from 'src/user-auth/decorator';
import { CreateTodoDto, EditTodoDto } from './dto';

@UseGuards(JwtGuard)
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get('')
  getTodos(@GetUser('id') userId: number) {
    return this.todoService.getTodos(userId);
  }

  @Get(':id')
  getTodoById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) todoId: number,
  ) {
    return this.todoService.getTodoById(userId, todoId);
  }

  @Post()
  createTodo(@GetUser('id') userId: number, @Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(userId, dto);
  }

  @Patch(':id')
  editTodo(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) todoId: number,
    @Body() dto: EditTodoDto,
  ) {
    return this.todoService.editTodo(userId, todoId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTodo(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) todoId: number,
  ) {
    return this.todoService.deleteTodo(userId, todoId);
  }
}
