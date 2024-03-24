import { Inject, Injectable } from '@nestjs/common';
import {
  UsersRepository,
  usersRepositoryToken,
} from '../ports/users.repository';
import { CreateUserCommand } from './createUser.command';
import { Builder } from 'builder-pattern';
import { IUser, User } from '../domains/user.domain';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(usersRepositoryToken.toString())
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<IUser> {
    const user = Builder(User)
      .userName(command.userName)
      .email(command.email)
      .build();
    await user.setHashPassword(command.password);
    return await this.usersRepository.create(user);
  }
}
