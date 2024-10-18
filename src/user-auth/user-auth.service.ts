import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable({})
export class UserAuthService {
  constructor(private prisma: PrismaService) {}
  test() {
    console.log('testing is working');
    return 'test is working ohoho';
  }

  signin() {
    return 'بتول ميو';
  }

  signup() {
    return 'i am not a cat';
  }
}
