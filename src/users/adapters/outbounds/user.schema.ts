import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserEntity } from './user.entity';

export const usersCollectionName = 'users';

@Schema({
  collection: usersCollectionName,
  timestamps: true,
})
export class UserMongoSchema implements UserEntity {
  @Prop()
  userName: string;

  @Prop()
  email: string;

  @Prop()
  hashedPassword: string;

  @Prop({ required: false })
  createdAt?: Date;

  @Prop({ required: false })
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserMongoSchema);
UserSchema.index({ userName: 1, email: 1 }, { unique: true });
