import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as pactum from 'pactum';
import { SigninDto, SignupDto } from 'src/user-auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateTodoDto, EditTodoDto } from 'src/todo/dto';
import { AuthDto } from 'src/admin-auth/dto';
describe('app e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(4422);
    prisma = app.get(PrismaService);

    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:4422');
  });

  afterAll(async () => {
    await prisma.$disconnect();
    app.close();
  });
  describe('Auth user', () => {
    it('Sign up', () => {
      const dto: SignupDto = {
        email: 'he@gmail.com',
        password: '123456789',
        firstName: 'hassan',
        lastName: 'zaki',
      };
      return pactum
        .spec()
        .post('/user-auth/signup')
        .withBody(dto)
        .expectStatus(201);
    });
    it('Sign in', () => {
      const dto: SigninDto = {
        email: 'he@gmail.com',
        password: '123456789',
      };
      return pactum
        .spec()
        .post('/user-auth/signin')
        .withBody(dto)
        .expectStatus(200)
        .stores('userAt', 'access_token');
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withBearerToken(`$S{userAt}`)
          .expectStatus(200);
      });
    });
    describe('Edit user', () => {
      it('should edit current user', () => {
        const dto: EditUserDto = {
          firstName: 'zozoz',
        };
        return pactum
          .spec()
          .patch('/users')
          .withBearerToken(`$S{userAt}`)
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName);
      });
    });
  });
  describe('Admin-auth', () => {
    it('Sign up', () => {
      const dto: AuthDto = {
        email: 'he312@gmail.com',
        password: '123456789',
      };
      return pactum
        .spec()
        .post('/admin-auth/signup')
        .withBody(dto)
        .expectStatus(201);
    });
    it('Sign in', () => {
      const dto: AuthDto = {
        email: 'he312@gmail.com',
        password: '123456789',
      };
      return pactum
        .spec()
        .post('/admin-auth/signin')
        .withBody(dto)
        .expectStatus(200)
        .stores('adminAt', 'access_token');
    });
  });
  describe('Additional user and todo for admin to delete', () => {
    it('Sign up another user', () => {
      const dto: SignupDto = {
        email: 'anotheruser@gmail.com',
        password: '123456789',
        firstName: 'another',
        lastName: 'user',
      };
      return pactum
        .spec()
        .post('/user-auth/signup')
        .withBody(dto)
        .expectStatus(201)
        .stores('userIdToDelete', 'id');
    });

    it('Sign in another user', () => {
      const dto: SigninDto = {
        email: 'anotheruser@gmail.com',
        password: '123456789',
      };
      return pactum
        .spec()
        .post('/user-auth/signin')
        .withBody(dto)
        .expectStatus(200)
        .stores('anotherUserAt', 'access_token');
    });
    it('Get another user id', () => {
      return pactum
        .spec()
        .get('/users/me')
        .withBearerToken(`$S{anotherUserAt}`)
        .expectStatus(200)
        .stores('userIdToDelete', 'id');
    });

    it('Create another todo', () => {
      const dto: CreateTodoDto = {
        title: 'Second Todo',
        description: 'This is another todo',
      };
      return pactum
        .spec()
        .post('/todos')
        .withBearerToken(`$S{anotherUserAt}`)
        .withBody(dto)
        .expectStatus(201)
        .stores('todoIdToDelete', 'id');
    });
  });
  describe('Admin', () => {
    describe('delete user', () => {
      it('should delete a user', () => {
        return pactum
          .spec()
          .delete('/admin/user/{id}')
          .withPathParams('id', '$S{userIdToDelete}')
          .withBearerToken(`$S{adminAt}`)
          .expectStatus(204);
      });
    });

    describe('delete todo', () => {
      it('should delete a todo', () => {
        return pactum
          .spec()
          .delete('/admin/todo/{id}')
          .withPathParams('id', '$S{todoIdToDelete}')
          .withBearerToken(`$S{adminAt}`)
          .expectStatus(204);
      });
    });
  });
  describe('Todo', () => {
    describe('Get empty todos', () => {
      it('should get empty todos', () => {
        return pactum
          .spec()
          .get('/todos')
          .withBearerToken(`$S{userAt}`)
          .expectStatus(200)
          .expectJson([]);
      });
    });

    describe('Create Todo', () => {
      it('should create a todo', () => {
        const dto: CreateTodoDto = {
          title: 'First Todo',
          description: 'This is my first todo',
        };
        return pactum
          .spec()
          .post('/todos')
          .withBearerToken(`$S{userAt}`)
          .withBody(dto)
          .expectStatus(201)
          .stores('todoId', 'id');
      });
    });

    describe('Get Todos', () => {
      it('should get todos', () => {
        return pactum
          .spec()
          .get('/todos')
          .withBearerToken(`$S{userAt}`)
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get Todo by Id', () => {
      it('should get todo by id', () => {
        return pactum
          .spec()
          .get('/todos/{id}')
          .withPathParams('id', '$S{todoId}')
          .withBearerToken(`$S{userAt}`)
          .expectStatus(200)
          .expectBodyContains('$S{todoId}');
      });
    });

    describe('Edit Todo', () => {
      it('should edit a todo', () => {
        const dto: EditTodoDto = {
          title: 'Updated Todo',
          description: 'This is the updated description',
        };
        return pactum
          .spec()
          .patch('/todos/{id}')
          .withPathParams('id', '$S{todoId}')
          .withBearerToken(`$S{userAt}`)
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.title)
          .expectBodyContains(dto.description);
      });
    });

    describe('Delete Todo', () => {
      it('should delete a todo', () => {
        return pactum
          .spec()
          .delete('/todos/{id}')
          .withPathParams('id', '$S{todoId}')
          .withBearerToken(`$S{userAt}`)
          .expectStatus(204);
      });

      it('should get empty todos after deletion', () => {
        return pactum
          .spec()
          .get('/todos')
          .withBearerToken(`$S{userAt}`)
          .expectStatus(200)
          .expectJson([]);
      });
    });
  });
});
