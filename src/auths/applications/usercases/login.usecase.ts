import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  usersRepositoryToken,
  UsersRepository,
} from '../../../users/applications/ports/users.repository';
import { LoginCommand } from './login.command';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(usersRepositoryToken.toString())
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginCommand) {
    const user = await this.usersRepository.getByUserName(command.username);
    const isPasswordCorrect = user.comparePassword(command.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid password');
    }
    return this.jwtService.sign({ sub: user.id, username: user.userName });
  }
}
