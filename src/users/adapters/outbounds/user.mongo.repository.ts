import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../applications/ports/users.repository';
import { IUser, User } from '../../applications/domains/user.domain';
import { InjectModel } from '@nestjs/mongoose';
import { usersCollectionName } from './user.schema';
import { Model } from 'mongoose';
import { UserEntity } from './user.entity';
import { Builder } from 'builder-pattern';

@Injectable()
export class UserMongoRepository implements UsersRepository {
  constructor(
    @InjectModel(usersCollectionName)
    private readonly userModel: Model<UserEntity>,
  ) {}

  async create(user: IUser): Promise<IUser> {
    const newUser = new this.userModel(user);
    const userCreated = await newUser.save();
    return UserMongoRepository.toDomain(userCreated);
  }
  async getByUserName(userName: string): Promise<IUser> {
    const user = await this.userModel.findOne({ userName }).exec();
    return UserMongoRepository.toDomain(user);
  }

  static toDomain(user: UserEntity): IUser {
    return Builder(User)
      .id(user._id.toString())
      .userName(user.userName)
      .email(user.email)
      .hashedPassword(user.hashedPassword)
      .createdAt(user.createdAt)
      .updatedAt(user.updatedAt)
      .build();
  }
}
