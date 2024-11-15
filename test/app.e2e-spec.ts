import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

    prisma = app.get(PrismaService);

    await prisma.cleanDb();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    app.close();
  });
  describe('Auth', () => {
    describe('Sign up Admin', () => {
      it.todo('should sign up');
    });
    describe('Sign in  Admin', () => {});

    describe('Sign up Admin', () => {});
    describe('Sign in  Admin', () => {});
  });

  describe('User', () => {
    describe('Get me', () => {});
    describe('Edit user', () => {});
  });

  describe('Admin', () => {
    describe('delete user', () => {});
    describe('delete todo', () => {});
  });

  describe('Todo', () => {
    describe('Get Todos', () => {});
    describe('Get Todo by Id', () => {});

    describe('Create Todo', () => {});
    describe('Edit Todo', () => {});
    describe('Delete Todo', () => {});
  });
});
