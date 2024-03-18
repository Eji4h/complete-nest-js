import { mock } from 'jest-mock-extended';
import { IProduct } from '../domains/product';
import { ProductsRepository } from '../ports/products.repository';
import { CreateProductUseCase } from './createProduct.usecase';

describe('Create Product Use Case', () => {
  it(`should be create product when product doesn't exists.`, async () => {
    // Arrange
    const product = mock<IProduct>();
    const productsRepository = mock<ProductsRepository>();
    productsRepository.create.mockResolvedValue(product);

    const createProductUseCase = new CreateProductUseCase(productsRepository);
    const command = product;

    // Act
    const actual = await createProductUseCase.execute(command);

    // Assert
    expect(actual).toStrictEqual(product);
    expect(productsRepository.create).toHaveBeenCalledWith(product);
  });
});
