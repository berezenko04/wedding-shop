import { Module } from '@nestjs/common';

// services
import { ProductService } from './product.service';

// controllers
import { ProductController } from './product.controller';

// modules
import { R2Module } from '../r2/r2.module';

@Module({
  imports: [R2Module],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
