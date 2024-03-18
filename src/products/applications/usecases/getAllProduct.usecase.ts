import { Inject, Injectable } from '@nestjs/common';
import {
  productsRepositoryToken,
  ProductsRepository,
} from '../ports/products.repository';
import { IProduct } from '../domains/product';

@Injectable()
export class GetAllProductUseCase {
  constructor(
    @Inject(productsRepositoryToken.toString())
    private readonly productsRepository: ProductsRepository,
  ) {}

  execute(): Promise<IProduct[]> {
    return this.productsRepository.getAll();
  }
}
