import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateUserUseCase } from '../../applications/usecases/createUser.usecase';
import { CreateUserDto } from './createUser.dto';
import { GetUserByUserNameUseCase } from '../../applications/usecases/getUserByUserName.usecase';
import { GetUserByUserNameQuery } from '../../applications/usecases/getUserByUserName.query';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByUserNameUseCase: GetUserByUserNameUseCase,
  ) {}

  async create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  async getByUserName(@Query('userName') userName: string) {
    const query: GetUserByUserNameQuery = {
      userName,
    };
    return this.getUserByUserNameUseCase.execute(query);
  }
}
