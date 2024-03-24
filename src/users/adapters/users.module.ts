import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, usersCollectionName } from './outbounds/user.schema';
import { UsersController } from './inbounds/users.controller';
import { CreateUserUseCase } from '../applications/usecases/createUser.usecase';
import { GetUserByUserNameUseCase } from '../applications/usecases/getUserByUserName.usecase';
import { usersRepositoryToken } from '../applications/ports/users.repository';
import { UserMongoRepository } from './outbounds/user.mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: usersCollectionName, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    GetUserByUserNameUseCase,
    {
      provide: usersRepositoryToken.toString(),
      useClass: UserMongoRepository,
    },
  ],
})
export class UsersModule {}
