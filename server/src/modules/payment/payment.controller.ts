import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

// services
import { PaymentService } from './payment.service';

// decorators
import { User } from 'src/common/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';

// dto
import { AddPaymentDto } from './dto/add-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
@Auth()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async add(@User('id') userId: string, @Body() dto: AddPaymentDto) {
    await this.paymentService.add(userId, dto);
    return { message: 'Payment method has been successfully added' };
  }

  @Get()
  async all(@User('id') userId: string) {
    return this.paymentService.all(userId);
  }

  @Patch()
  async update(@User('id') userId: string, @Body() dto: UpdatePaymentDto) {
    await this.paymentService.update(userId, dto);
    return { messasge: 'Payment method was updated' };
  }

  @Delete()
  async delete(@User('id') userId: string, @Param('id', new ParseUUIDPipe()) paymentId: string) {
    await this.paymentService.delete(userId, paymentId);
    return { message: 'Payment method was removed' };
  }
}
