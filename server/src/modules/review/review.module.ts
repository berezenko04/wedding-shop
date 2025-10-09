import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ProductService } from '../product/product.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ProductService],
})
export class ReviewModule {}
