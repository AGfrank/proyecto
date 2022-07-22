import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Order } from 'src/orders/schemas/order.schema';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor( 
    @InjectModel(Product.name) private readonly productsModule: Model<ProductDocument>, 
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> { 
    return this.productsModule.create(createProductDto); 
  }

  async findAll(request: Request): Promise<Product[]> { 
    return this.productsModule
      .find(request.query) 
      .setOptions({ sanitizeFilter: true }) 
      .populate({ path: 'orders.userId' }) 
      .exec();
  }

  async findOne(id: string): Promise<Product> { 
    return this.productsModule
      .findOne({ _id: id })
      .populate({ path: 'orders.userId' }) 
      .exec(); 
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> { 
    return this.productsModule.findOneAndUpdate({ _id: id }, updateProductDto, { 
      new: true, 
    });
  }

  async remove(id: string) { 
    return this.productsModule.findByIdAndRemove({ _id: id }).exec(); 
  }

  async getOrder(userId: User): Promise<ProductDocument> {
    const order = await this.productsModule.findOne({ userId });
    return order;
  }

  async addOrder(id: string, userId: User, orderDto: CreateOrderDto) { 
    const { date, quantity, code } = orderDto;
    const product: ProductDocument = await this.productsModule.findById(id); 

    const order = await this.getOrder(userId);

    if (order) {
      const orderIndex = product.orders.findIndex((item) => item.code == code);

      if (orderIndex > -1) {
        let item = product.orders[orderIndex];
        item.quantity = Number(item.quantity) + Number(quantity);

        product.orders[orderIndex] = item;
        return order.save();
      } else {
        product.orders.push({ ...orderDto });
        return order.save();
      }
    } else {
      product.orders.push({
        userId,
        date,
        quantity,
        code
      })
      return product.save();
    }
  }
}
