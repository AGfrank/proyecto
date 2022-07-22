import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Order, OrderSchema } from "src/orders/schemas/order.schema";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    description: string;

    @Prop([String]) 
    categories: string[];

    @Prop([OrderSchema]) 
    orders: Order[]; 
  }
  
  export const ProductSchema = SchemaFactory.createForClass(Product); 