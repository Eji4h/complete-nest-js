import { Inject, Injectable } from '@nestjs/common';
import {
  ProductsRepository,
  productsRepositoryToken,
} from '../ports/products.repository';
import { IProduct } from '../domains/product';
import { CreateProductCommand } from './createProduct.command';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(productsRepositoryToken.toString())
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute(command: CreateProductCommand): Promise<IProduct> {
    const productCreated = await this.productsRepository.create(command);
    return productCreated;
  }
}
