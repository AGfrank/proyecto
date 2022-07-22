import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ParseObjectIdPipe } from 'src/utilities/parse-object-id-pipe.pipe';
import { Request } from 'express';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
@ApiTags('order') 
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /*@Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }*/

  @Get()
  findAll(@Req() request: Request) {
    return this.ordersService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  async update(@Req() request, @Param('id', ParseObjectIdPipe) id: string, @Body() updateOrderDto: UpdateOrderDto) {
    const userId = request.user.userId;
    return this.ordersService.update(id, userId, updateOrderDto); 
  }
  
  @Delete(':id')
  async remove(@Req() request, @Param('id', ParseObjectIdPipe) id: string) {
    const userId = request.user.userId;
    return this.ordersService.remove(id, userId); 
  }
}
