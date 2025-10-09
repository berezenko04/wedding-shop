import { Module } from '@nestjs/common';

// controllers
import { CartController } from './cart.controller';

// services
import { ProductService } from '../product/product.service';
import { CartService } from './cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService, ProductService],
})
export class CartModule {}
