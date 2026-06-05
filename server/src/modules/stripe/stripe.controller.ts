import {
  BadRequestException,
  Controller,
  Headers,
  HttpCode,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { ShipmentStatuses } from '@prisma/client';

// services
import { StripeService } from './stripe.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    let event;

    try {
      event = this.stripeService.constructWebhookEvent(
        req.rawBody as Buffer,
        signature,
      );
    } catch (err) {
      throw new BadRequestException(`Invalid signature: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      if (session.payment_status !== 'paid') return { received: true };

      const orderNumber = session.metadata?.orderNumber;

      if (orderNumber) {
        await this.prisma.order.update({
          where: { orderNumber: Number(orderNumber) },
          data: { status: ShipmentStatuses.DELIVERED },
        });
      }
    }

    return { received: true };
  }
}
