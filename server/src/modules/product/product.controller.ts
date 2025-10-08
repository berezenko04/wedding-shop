import { Controller, Get, Query } from '@nestjs/common';

// services
import { ProductService } from './product.service';

// dto
import { GetAllProductsDto } from './dto/get-all-products.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async all(@Query() dto: GetAllProductsDto) {
    return this.productService.all(dto);
  }
}
