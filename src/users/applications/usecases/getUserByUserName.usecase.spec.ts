import { faker } from '@faker-js/faker';
import { mock } from 'jest-mock-extended';
import { IUser } from '../domains/user.domain';
import { UsersRepository } from '../ports/users.repository';
import { GetUserByUserNameUseCase } from './getUserByUserName.usecase';
import { GetUserByUserNameQuery } from './getUserByUserName.query';

describe('Get User By User Name Use Case', () => {
  it('should be get user when user exists', async () => {
    // Arrange
    const userName = faker.internet.userName();
    const user = mock<IUser>({
      userName,
    });

    const usersRepository = mock<UsersRepository>();
    usersRepository.getByUserName.mockResolvedValue(user);

    const getUserByUserNameUseCase = new GetUserByUserNameUseCase(
      usersRepository,
    );

    const query: GetUserByUserNameQuery = {
      userName,
    };

    const expected = user;

    // Act
    const actual = await getUserByUserNameUseCase.execute(query);

    // Assert
    expect(actual).toEqual(expected);
    expect(usersRepository.getByUserName).toHaveBeenCalledWith(userName);
  });
});
