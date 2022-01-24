import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersRepository } from './repositories/users.repository';
import { UsersServices } from './services/users.service';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'super secret ebanarotsdaad',
      signOptions: { expiresIn: '60d' },
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [UsersServices, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
