import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersServices } from './services/users.service';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersServices) {}
  @Post('login')
  login(@Body() creds: CreateUserDto): Promise<{ token: string }> {
    return this.usersService.login(creds);
  }

  @Post('register')
  register(@Body() creds: CreateUserDto): Promise<{ token: string }> {
    return this.usersService.register(creds);
  }
}
