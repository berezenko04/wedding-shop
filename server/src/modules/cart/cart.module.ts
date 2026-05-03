import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';

// controllers
import { CartController } from './cart.controller';

// services
import { CartService } from './cart.service';

@Module({
  imports: [ProductModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
