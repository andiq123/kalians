/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUser } from './get-user.decorator';
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

  @UseGuards(AuthGuard())
  @Get('check')
  check(@GetUser() username: string): Promise<{ username: string }> {
    return this.usersService.check(username);
  }
}
