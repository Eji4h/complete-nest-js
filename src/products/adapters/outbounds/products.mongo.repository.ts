import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../../applications/ports/products.repository';
import { InjectModel } from '@nestjs/mongoose';
import { productsCollectionName } from './product.schema';
import { Model } from 'mongoose';
import { ProductEntity } from './product.entity';
import { IProduct, Product } from '../../applications/domains/product';
import { Builder } from 'builder-pattern';

@Injectable()
export class ProductsMongoRepository implements ProductsRepository {
  constructor(
    @InjectModel(productsCollectionName)
    private readonly productModel: Model<ProductEntity>,
  ) {}

  async create(product: IProduct): Promise<IProduct> {
    const createdProduct = await this.productModel.create(product);
    return ProductsMongoRepository.toDomain(createdProduct);
  }

  async getAll(): Promise<IProduct[]> {
    const products = await this.productModel.find().exec();
    return products.map(ProductsMongoRepository.toDomain);
  }

  async getById(id: string): Promise<IProduct> {
    const product = await this.productModel.findById(id).exec();
    return ProductsMongoRepository.toDomain(product);
  }

  async updateById(id: string, product: Partial<IProduct>): Promise<IProduct> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, product, { new: true })
      .exec();
    return ProductsMongoRepository.toDomain(updatedProduct);
  }

  async deleteById(id: string): Promise<void> {
    await this.productModel.deleteOne({ _id: id }).exec();
  }

  static toDomain(product: ProductEntity): IProduct {
    return Builder(Product)
      .id(product._id.toString())
      .name(product.name)
      .detail(product.detail)
      .amount(product.amount)
      .price(product.price)
      .createdAt(product.createdAt)
      .updatedAt(product.updatedAt)
      .build();
  }
}
