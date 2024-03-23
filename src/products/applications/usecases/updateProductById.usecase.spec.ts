import { Builder } from 'builder-pattern';
import { faker } from '@faker-js/faker';
import { IProduct, Product } from '../domains/product';
import { mock } from 'jest-mock-extended';
import { ProductsRepository } from '../ports/products.repository';
import { clone } from 'radash';
import { UpdateProductByIdUseCase } from './updateProductById.usecase';
import { UpdateProductByIdCommand } from './updateProductById.command';

describe('Update product by id use case', () => {
  it('should be pass id and product to update.', async () => {
    // Arrange
    const productId = faker.database.mongodbObjectId().toString();
    const oldProduct = Builder(Product)
      .id(productId)
      .name(faker.commerce.productName())
      .detail(faker.commerce.productDescription())
      .price(faker.number.float(10000))
      .amount(faker.number.int(10))
      .build();

    const productToUpdated = mock<IProduct>({
      amount: 100,
    });

    const expectedUpdatedProduct = clone(oldProduct);
    expectedUpdatedProduct.amount = 100;

    const productsRepository = mock<ProductsRepository>();
    productsRepository.updateById.mockResolvedValue(expectedUpdatedProduct);

    const updateProductByIdUseCase = new UpdateProductByIdUseCase(
      productsRepository,
    );

    const command: UpdateProductByIdCommand = {
      id: productId,
      product: productToUpdated,
    };

    // Act
    const actual = await updateProductByIdUseCase.execute(command);

    // Assert
    expect(actual).toStrictEqual(expectedUpdatedProduct);
    expect(productsRepository.updateById).toHaveBeenCalledWith(
      productId,
      productToUpdated,
    );
  });
});
