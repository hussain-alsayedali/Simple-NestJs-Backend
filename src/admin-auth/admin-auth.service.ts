import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
@Injectable()
export class AdminAuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);

      const admin = await this.prisma.admin.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });

      return this.signToken(admin.id, admin.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credentials taken');
        }
      }
      throw error;
    }
  }
  async signin(dto: AuthDto) {
    const admin = await this.prisma.admin.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!admin) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await argon.verify(admin.password, dto.password);

    if (!pwMatches) throw new ForbiddenException('Credentials incoreect');

    return this.signToken(admin.id, admin.email);
  }
  async signToken(adminId: number, email: string) {
    const payload = {
      sub: adminId,
      email: email,
      role: 'admin',
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
