import { IUser } from '../../applications/domains/user.domain';

export interface CreateUserDto
  extends Omit<
    IUser,
    'hashedPassword' | 'setHashPassword' | 'comparePassword'
  > {
  password: string;
}
