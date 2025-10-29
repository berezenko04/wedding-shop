import { Body, Controller, Delete, Get, Patch, Query } from '@nestjs/common';

// services
import { CartService } from './cart.service';

// decorators
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';

// dto
import { UpdateCartDto } from './dto/update-cart.dto';
import { DeleteFromCartDto } from './dto/delete-from-cart.dto';

@Auth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Patch()
  async update(@User('id') userId: string, @Body() dto: UpdateCartDto) {
    await this.cartService.updateCart(userId, dto);
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
