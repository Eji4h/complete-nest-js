export interface IProduct {
  id?: string;
  name: string;
  detail: string;
  amount: number;
  price: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export class Product implements IProduct {
  id?: string;
  name: string;
  detail: string;
  amount: number;
  price: number;

  createdAt?: Date;
  updatedAt?: Date;
}
