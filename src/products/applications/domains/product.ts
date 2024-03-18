export interface IProduct {
  id?: string;
  name: string;
  detail: string;
  amount: string;
  price: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export class Product implements IProduct {
  id?: string;
  name: string;
  detail: string;
  amount: string;
  price: string;

  createdAt?: Date;
  updatedAt?: Date;
}
