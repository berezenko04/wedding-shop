import { Controller, Post } from '@nestjs/common';

// services
import { StripeService } from './stripe.service';
import { CartService } from '../cart/cart.service';

// decorators
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly cartService: CartService,
  ) {}

  @Auth()
  @Post('checkout')
  async checkout(@User('id') userId: string) {
    const cart = await this.cartService.getCart(userId);
    const total = cart.reduce(
      (acc, { quantity, product }) =>
        acc + quantity * (product.price * (1 - (product.discount ?? 0))),
      0,
    );
    return this.stripeService.createCheckoutSession();
  }
}
