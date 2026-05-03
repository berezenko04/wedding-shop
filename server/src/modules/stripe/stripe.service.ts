import { Injectable } from '@nestjs/common';
import * as Stripe from 'stripe';

// services
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService {
  private stripe: InstanceType<typeof Stripe>;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.getOrThrow<string>('STRIPE_SECRET_KEY'),
    );
  }

  async createCheckoutSession(orderId: string, amount: number) {
    return this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Sandrela Test Payment' },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderId,
      },
      success_url: `${this.configService.get('FRONTEND_URL')}/checkout/success?id={CHECKOUT_SESSION_ID}`,
      cancel_url: this.configService.get('FRONTEND_URL'),
    });
  }
}
