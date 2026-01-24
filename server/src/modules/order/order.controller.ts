import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

// service
import { OrderService } from './order.service';

// decorators
import { User } from 'src/common/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';

// dto
import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('orders')
@Auth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@User('id') userId: string, @Body() dto: CreateOrderDto) {
    return this.orderService.create(userId, dto);
  }

  @Get()
  async all(@User('id') userId: string, @Query() dto: PaginationDto) {
    return this.orderService.all(userId, dto);
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
