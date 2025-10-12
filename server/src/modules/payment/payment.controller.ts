import { Body, Controller, Get, Post } from '@nestjs/common';

// services
import { PaymentService } from './payment.service';

// decorators
import { User } from 'src/common/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';

// dto
import { AddPaymentDto } from './dto/add-payment.dto';

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
}
