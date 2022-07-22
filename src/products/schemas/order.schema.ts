import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import mongoose from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  date: string;

  @Prop()
  quantity: number;

  @Prop()
  order: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }) 
  userId: User; 
}

export const OrderSchema = SchemaFactory.createForClass(Order);