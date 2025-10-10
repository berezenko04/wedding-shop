import { Body, Controller, Get, Post } from '@nestjs/common';

// service
import { OrderService } from './order.service';

// decorators
import { User } from 'src/common/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';

// dto
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
@Auth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@User('id') userId: string, @Body() dto: CreateOrderDto) {
    await this.orderService.create(userId, dto);
    return { message: 'Order is created' };
  }

  @Get()
  async all(@User('id') userId: string) {
    return this.orderService.all(userId);
  }
}
