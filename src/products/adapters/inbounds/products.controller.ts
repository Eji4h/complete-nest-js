import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductUseCase } from '../../applications/usecases/createProduct.usecase';
import { CreateProductDto } from './createProduct.dto';
import { CreateProductCommand } from '../../applications/usecases/createProduct.command';
import { GetAllProductUseCase } from '../../applications/usecases/getAllProduct.usecase';
import { GetProductByIdUseCase } from '../../applications/usecases/getProductById.usecase';
import { GetProductByIdQuery } from '../../applications/usecases/getProductById.query';
import { UpdateProductByIdUseCase } from '../../applications/usecases/updateProductById.usecase';
import { UpdateProductByIdDto } from './updateProductById.dto';
import { UpdateProductByIdCommand } from '../../applications/usecases/updateProductById.command';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductUseCase: GetAllProductUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly updateProductByIdUseCase: UpdateProductByIdUseCase,
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

  @Put(':id')
  updateById(@Param('id') id: string, @Body() product: UpdateProductByIdDto) {
    const command: UpdateProductByIdCommand = {
      id,
      product,
    };
    return this.updateProductByIdUseCase.execute(command);
  }
}
