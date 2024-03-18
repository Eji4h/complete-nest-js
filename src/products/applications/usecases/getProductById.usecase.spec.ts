import { faker } from '@faker-js/faker';
import { mock } from 'jest-mock-extended';
import { IProduct } from '../domains/product';
import { ProductsRepository } from '../ports/products.repository';
import { GetProductByIdUseCase } from './getProductById.usecase';
import { GetProductByIdQuery } from './getProductById.query';

describe('Get Product By Id Use Case', () => {
  it('should be pass correct id.', async () => {
    // Arrange
    const productId = faker.database.mongodbObjectId().toString();
    const product1 = mock<IProduct>({
      id: productId,
    });

    const productsRepository = mock<ProductsRepository>();
    productsRepository.getById.mockResolvedValue(product1);

    const getProductByIdUseCase = new GetProductByIdUseCase(productsRepository);
    const query: GetProductByIdQuery = {
      id: productId,
    };
    const expected = product1;

    // Act
    const actual = await getProductByIdUseCase.execute(query);

    // Assert
    expect(actual).toStrictEqual(expected);
    expect(productsRepository.getById).toHaveBeenCalledWith(productId);
  });
});
