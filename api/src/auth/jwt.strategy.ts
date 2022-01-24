import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super secret ebanarotsdaad',
    });
  }

  async validate(payload: { username: string }) {
    const { username } = payload;
    const user = await this.usersRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
