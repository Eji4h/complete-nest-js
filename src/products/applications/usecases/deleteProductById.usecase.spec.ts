import { faker } from '@faker-js/faker';
import { mock } from 'jest-mock-extended';
import { ProductsRepository } from '../ports/products.repository';
import { DeleteProductByIdUseCase } from './deleteProductById.usecase';
import { DeleteProductByIdCommand } from './deleteProductById.command';

describe('Delete product by id use case', () => {
  it('should be pass correct id to delete', async () => {
    // Arrange
    const productId = faker.database.mongodbObjectId().toString();
    const productsRepository = mock<ProductsRepository>();

    const deleteProductByIdUseCase = new DeleteProductByIdUseCase(
      productsRepository,
    );
    const command: DeleteProductByIdCommand = {
      id: productId,
    };

    // Act
    await deleteProductByIdUseCase.execute(command);

    // Arrange
    expect(productsRepository.deleteById).toHaveBeenCalledWith(productId);
  });
});
