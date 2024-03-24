import { IUser } from '../domains/user.domain';

export type GetUserByUserNameQuery = Pick<IUser, 'userName'>;
