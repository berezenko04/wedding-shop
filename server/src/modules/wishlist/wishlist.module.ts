import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';

// controllers
import { WishlistController } from './wishlist.controller';

// services
import { WishlistService } from './wishlist.service';

@Module({
  imports: [ProductModule],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
