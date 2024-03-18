import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductUseCase } from '../../applications/usecases/createProduct.usecase';
import { CreateProductDto } from './createProduct.dto';
import { CreateProductCommand } from '../../applications/usecases/createProduct.command';
import { GetAllProductUseCase } from '../../applications/usecases/getAllProduct.usecase';
import { GetProductByIdUseCase } from '../../applications/usecases/getProductById.usecase';
import { GetProductByIdQuery } from '../../applications/usecases/getProductById.query';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductUseCase: GetAllProductUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
  ) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const command: CreateProductCommand = createProductDto;
    const productCreated = await this.createProductUseCase.execute(command);
    return productCreated;
  }

  @Get()
  getAllProducts() {
    return this.getAllProductUseCase.execute();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    const query: GetProductByIdQuery = {
      id,
    };
    return this.getProductByIdUseCase.execute(query);
  }
}
