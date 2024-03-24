import * as bcrypt from 'bcrypt';
import { saltRounds } from '../../../configs/bcrypt.config';

export interface IUser {
  id?: string;
  userName: string;
  email: string;
  hashedPassword: string;
  createdAt?: Date;
  updatedAt?: Date;
  setHashPassword(password: string): void;
  comparePassword(password: string): boolean;
}

export class User implements IUser {
  id?: string;
  userName: string;
  email: string;
  hashedPassword: string;
  createdAt?: Date;
  updatedAt?: Date;

  setHashPassword(password: string) {
    this.hashedPassword = bcrypt.hashSync(password, saltRounds);
  }

  comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.hashedPassword);
  }
}
