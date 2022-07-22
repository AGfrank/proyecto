import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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

  async addOrder(id: string, order: any) { 
    let product: ProductDocument = await this.productsModule.findById(id); 
    product.orders.push(order); 
    product.save(); 
    return product;
  }
}
