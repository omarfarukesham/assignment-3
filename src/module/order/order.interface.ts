import { Types } from 'mongoose';

export type Order = {
    id: string; 
    email: string; 
    product: Types.ObjectId;
    quantity: number; 
    totalPrice: number; 
  };
  