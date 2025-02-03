import { Types } from 'mongoose';

export type Order = {
    id: string; 
    email: string; 
    product: Types.ObjectId;
    quantity: number; 
    totalPrice: number; 
    paymentStatus: "pending" | "paid" | "failed";
    paymentIntentId?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  

