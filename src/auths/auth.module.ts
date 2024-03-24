import { Module } from '@nestjs/common';
import { AuthController } from './adapters/inbounds/auth.controller';
import { LoginUseCase } from './applications/usercases/login.usecase';
import { UserMongoRepository } from '../users/adapters/outbounds/user.mongo.repository';
import { usersRepositoryToken } from '../users/applications/ports/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  usersCollectionName,
  UserSchema,
} from '../users/adapters/outbounds/user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtExpiresIn, jwtSecret } from '../configs/jwt.config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: usersCollectionName, schema: UserSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: jwtExpiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    LoginUseCase,
    {
      provide: usersRepositoryToken.toString(),
      useClass: UserMongoRepository,
    },
  ],
  exports: [LoginUseCase],
})
export class AuthModule {}
