import { Inject, Injectable } from '@nestjs/common';
import {
  productsRepositoryToken,
  ProductsRepository,
} from '../ports/products.repository';
import { DeleteProductByIdCommand } from './deleteProductById.command';

@Injectable()
export class DeleteProductByIdUseCase {
  constructor(
    @Inject(productsRepositoryToken.toString())
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute(command: DeleteProductByIdCommand) {
    await this.productsRepository.deleteById(command.id);
  }
}
