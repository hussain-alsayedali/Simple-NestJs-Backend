import { Module } from '@nestjs/common';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserAuthController],
  providers: [UserAuthService, JwtStrategy],
})
export class AuthModule {}
