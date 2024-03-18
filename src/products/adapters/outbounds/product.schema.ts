import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductEntity } from './product.entity';

export const productCollectionName = 'products';

@Schema({
  collection: productCollectionName,
  timestamps: true,
})
export class ProductMongoSchema implements ProductEntity {
  @Prop()
  name: string;

  @Prop()
  detail: string;

  @Prop()
  amount: string;

  @Prop()
  price: string;

  @Prop({ required: false })
  createdAt?: Date;

  @Prop({ required: false })
  updatedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(ProductMongoSchema);
