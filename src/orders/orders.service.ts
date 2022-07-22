import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor( 
    @InjectModel(Order.name) private readonly ordersModule: Model<OrderDocument>, 
  ) {}

  create(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersModule.create(createOrderDto); 
  }

  async findAll(request: Request): Promise<Order[]> { 
    return this.ordersModule
      .find(request.query) 
      .setOptions({ sanitizeFilter: true }) 
      .populate({ path: 'userId' }) 
      .exec();
  }

  async findOne(id: string): Promise<Order> {
    return this.ordersModule
      .findOne({ _id: id })
      .populate({ path: 'userId' }) 
      .exec(); 
  }

  async update(id: string, userId: User, updateOrderDto: UpdateOrderDto): Promise<Order> { 
    return this.ordersModule.findOneAndUpdate({ _id: id, userId: userId }, updateOrderDto, { 
      new: true, 
    });
  }

  async remove(id: string, userId: User) {
    return this.ordersModule.findOneAndRemove({ _id: id, userId: userId }).exec(); 
  }
}
