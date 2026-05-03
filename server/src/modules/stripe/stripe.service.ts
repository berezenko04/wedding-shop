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

  constructWebhookEvent(payload: Buffer, signature: string) {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      this.configService.getOrThrow<string>('STRIPE_WEBHOOK_SECRET'),
    );
  }

  async createCheckoutSession(orderNumber: number, amount: number) {
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
        orderNumber,
      },
      success_url: `${this.configService.get('FRONTEND_URL')}/checkout/success?id={CHECKOUT_SESSION_ID}`,
      cancel_url: this.configService.get('FRONTEND_URL'),
    });
  }
}
