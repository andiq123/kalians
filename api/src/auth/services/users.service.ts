import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersServices {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  async register(creds: CreateUserDto): Promise<{ token: string }> {
    await this.usersRepository.createUser(creds);
    return await this.createToken(creds.username);
  }

  async login(creds: CreateUserDto): Promise<{ token: string }> {
    await this.usersRepository.checkCreds(creds);
    return await this.createToken(creds.username);
  }

  async createToken(username: string): Promise<{ token: string }> {
    const payload = { username };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }
}
