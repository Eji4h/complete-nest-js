import { Inject, Injectable } from '@nestjs/common';
import { IProduct } from '../domains/product';
import {
  ProductsRepository,
  productsRepositoryToken,
} from '../ports/products.repository';
import { UpdateProductByIdCommand } from './updateProductById.command';

@Injectable()
export class UpdateProductByIdUseCase {
  constructor(
    @Inject(productsRepositoryToken.toString())
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute(command: UpdateProductByIdCommand): Promise<IProduct> {
    const product = await this.productsRepository.updateById(
      command.id,
      command.product,
    );

    return product;
  }
}
