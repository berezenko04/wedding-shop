import { Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CartService } from '../cart/cart.service';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly cartService: CartService,
  ) {}

  @Post('checkout')
  async checkout() {}
}
