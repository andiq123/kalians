import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { GoneException, UnauthorizedException } from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser({ username, password }: CreateUserDto): Promise<void> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.create({ username, password: hashedPassword });
      await this.save(user);
    } catch (error) {
      throw new GoneException('User already exists');
    }
  }

  async checkCreds({ username, password }: CreateUserDto): Promise<void> {
    const user = await this.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
