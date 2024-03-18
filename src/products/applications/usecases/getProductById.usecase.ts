import { Inject, Injectable } from '@nestjs/common';
import {
  productsRepositoryToken,
  ProductsRepository,
} from '../ports/products.repository';
import { GetProductByIdQuery } from './getProductById.query';

@Injectable()
export class GetProductByIdUseCase {
  constructor(
    @Inject(productsRepositoryToken.toString())
    private readonly productsRepository: ProductsRepository,
  ) {}

  execute(query: GetProductByIdQuery) {
    return this.productsRepository.getById(query.id);
  }
}
