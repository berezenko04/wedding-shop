import { Body, Controller, ParseUUIDPipe, Post } from '@nestjs/common';

// services
import { WishlistService } from './wishlist.service';

// decorators
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';

@Controller('wishlist')
@Auth()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  async add(
    @User('id') userId: string,
    @Body('productId', new ParseUUIDPipe()) productId: string,
  ) {
    await this.wishlistService.addToWishlist(userId, productId);
    return { message: 'Added to wishlist' };
  }
}
