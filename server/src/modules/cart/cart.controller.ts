import { Body, Controller, Post } from '@nestjs/common';

// services
import { CartService } from './cart.service';

// decorators
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';

// dto
import { AddToCartDto } from './dto/add-to-cart.dto';

@Auth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async add(@User('id') userId: string, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(userId, dto);
  }
}
