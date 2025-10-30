import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';

// services
import { WishlistService } from './wishlist.service';

// dto
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CheckWishlistDto } from './dto/check-wishlist.dto';

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
    await this.wishlistService.add(userId, productId);
    return this.wishlistService.get(userId, { page: 1, limit: 10 });
  }

  @Get()
  async get(@User('id') userId: string, @Query() dto: PaginationDto) {
    return this.wishlistService.get(userId, dto);
  }

  @Post('check')
  async check(@User('id') userId: string, @Body() dto: CheckWishlistDto) {
    return this.wishlistService.check(userId, dto.ids);
  }

  @Delete(':id')
  async remove(
    @User('id') userId: string,
    @Param('id') wishlistItemId: string,
  ) {
    await this.wishlistService.remove(userId, wishlistItemId);
    return this.wishlistService.get(userId, { page: 1, limit: 10 });
  }
}
