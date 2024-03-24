import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoUri } from './configs/mongo.config';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/adapters/users.module';

@Module({
  imports: [MongooseModule.forRoot(mongoUri), ProductsModule, UsersModule],
})
export class AppModule {}
