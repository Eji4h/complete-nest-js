import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { mongoUri } from './configs/mongo.config';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/adapters/users.module';
import { jwtExpiresIn, jwtSecret } from './configs/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auths/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: jwtExpiresIn },
    }),
    AuthModule,
    ProductsModule,
    UsersModule,
  ],
})
export class AppModule {}
