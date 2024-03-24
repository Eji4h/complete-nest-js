import { Inject, Injectable } from '@nestjs/common';
import { IUser } from '../domains/user.domain';
import {
  usersRepositoryToken,
  UsersRepository,
} from '../ports/users.repository';
import { GetUserByUserNameQuery } from './getUserByUserName.query';

@Injectable()
export class GetUserByUserNameUseCase {
  constructor(
    @Inject(usersRepositoryToken.toString())
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(query: GetUserByUserNameQuery): Promise<IUser> {
    return await this.usersRepository.getByUserName(query.userName);
  }
}
