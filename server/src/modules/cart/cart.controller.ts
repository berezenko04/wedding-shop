import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';

// services
import { CartService } from './cart.service';

// decorators
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';

// dto
import { AddToCartDto } from './dto/add-to-cart.dto';
import { DeleteFromCartDto } from './dto/delete-from-cart.dto';

@Auth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async add(@User('id') userId: string, @Body() dto: AddToCartDto) {
    await this.cartService.addToCart(userId, dto);
    return this.cartService.getCart(userId);
  }

  @Get()
  async get(@User('id') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Delete()
  async delete(@User('id') userId: string, @Query() dto: DeleteFromCartDto) {
    await this.cartService.deleteFromCart(userId, dto);
    return this.cartService.getCart(userId);
  }
}
