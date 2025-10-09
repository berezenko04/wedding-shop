import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';

// services
import { WishlistService } from './wishlist.service';

// decorators
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('wishlist')
@Auth()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  async add(
    @User('id') userId: string,
    @Body('productId', new ParseUUIDPipe()) productId: string,
  ) {
    await this.wishlistService.add(userId, productId);
    return { message: 'Added to wishlist' };
  }

  @Get()
  async get(@User('id') userId: string, @Query() dto: PaginationDto) {
    return this.wishlistService.get(userId, dto);
  }
}
