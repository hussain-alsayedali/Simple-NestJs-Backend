import { Injectable } from '@nestjs/common';

@Injectable({})
export class UserAuthService {
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
