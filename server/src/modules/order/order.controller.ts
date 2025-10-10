import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
} from '@nestjs/common';

// service
import { OrderService } from './order.service';

// decorators
import { User } from 'src/common/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';

// dto
import { CreateOrderDto } from './dto/create-order.dto';
import { Response } from 'express';

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

  @Get('csv/:id')
  async exportToCsv(
    @Res({ passthrough: true }) res: Response,
    @User('id')
    userId: string,
    @Param('id', new ParseUUIDPipe()) orderId: string,
  ) {
    const csv = await this.orderService.exportToCsv(userId, orderId);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=order-${orderId}.csv`,
    );
    res.send(csv);
  }
}
