import { Module } from '@nestjs/common';

// controllers
import { WishlistController } from './wishlist.controller';

// services
import { WishlistService } from './wishlist.service';
import { ProductService } from '../product/product.service';

@Module({
  controllers: [WishlistController],
  providers: [WishlistService, ProductService],
})
export class WishlistModule {}
