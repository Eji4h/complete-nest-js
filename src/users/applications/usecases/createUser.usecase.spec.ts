import { Builder, StrictBuilder } from 'builder-pattern';
import { User } from '../domains/user.domain';
import { faker } from '@faker-js/faker';
import { CreateUserCommand } from './createUser.command';
import { mock } from 'jest-mock-extended';
import { UsersRepository } from '../ports/users.repository';
import { CreateUserUseCase } from './createUser.usecase';

describe('Create User Use Case', () => {
  it('should be create user when user not exists', async () => {
    // Arrange
    const userName = faker.internet.userName();
    const password = faker.internet.password();
    const email = faker.internet.email();
    const expected = Builder(User).userName(userName).email(email).build();

    const usersRepository = mock<UsersRepository>();
    usersRepository.create.mockResolvedValue(expected);
    const setHashPasswordSpy = jest
      .spyOn(User.prototype, 'setHashPassword')
      .mockImplementation(() => {
        return 'hashedPassword';
      });

    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const command: CreateUserCommand = StrictBuilder<CreateUserCommand>()
      .userName(userName)
      .email(email)
      .password(password)
      .build();

    // Act
    const actual = await createUserUseCase.execute(command);

    // Assert
    expect(actual).toEqual(expected);
    expect(setHashPasswordSpy).toHaveBeenCalledWith(password);
    expect(usersRepository.create).toHaveBeenCalledWith(expected);
  });
});
