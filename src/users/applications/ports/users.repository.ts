import { IUser } from '../domains/user.domain';

export const usersRepositoryToken: unique symbol = Symbol('UsersRepository');

export interface UsersRepository {
  create(user: IUser): Promise<IUser>;
  getByUserName(username: string): Promise<IUser>;
}
