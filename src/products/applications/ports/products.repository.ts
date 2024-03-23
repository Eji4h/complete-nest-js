import { IProduct } from '../domains/product';

export const productsRepositoryToken: unique symbol =
  Symbol('ProductsRepository');

export interface ProductsRepository {
  create(product: IProduct): Promise<IProduct>;
  getAll(): Promise<IProduct[]>;
  getById(id: string): Promise<IProduct>;
  updateById(id: string, product: Partial<IProduct>): Promise<IProduct>;
}
