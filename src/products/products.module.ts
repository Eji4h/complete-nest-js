import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductSchema,
  productCollectionName,
} from './adapters/outbounds/product.schema';
import { ProductsController } from './adapters/inbounds/products.controller';
import { CreateProductUseCase } from './applications/usecases/createProduct.usecase';
import { productsRepositoryToken } from './applications/ports/products.repository';
import { ProductsMongoRepository } from './adapters/outbounds/products.mongo.repository';
import { GetAllProductUseCase } from './applications/usecases/getAllProduct.usecase';
import { GetProductByIdUseCase } from './applications/usecases/getProductById.usecase';
import { UpdateProductByIdUseCase } from './applications/usecases/updateProductById.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: productCollectionName, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [
    CreateProductUseCase,
    GetAllProductUseCase,
    GetProductByIdUseCase,
    UpdateProductByIdUseCase,
    {
      provide: productsRepositoryToken.toString(),
      useClass: ProductsMongoRepository,
    },
  ],
})
export class ProductsModule {}
