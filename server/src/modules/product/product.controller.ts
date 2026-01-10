import {
  Controller,
  Get,
  Param,
  Body,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';

// services
import { ProductService } from './product.service';

// decorators
import { Auth } from '../auth/decorators/auth.decorator';
import { DevOnly } from 'src/common/decorators/dev-only.decorator';

// dto
import { GetAllProductsDto } from './dto/get-all-products.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async all(@Query() dto: GetAllProductsDto) {
    return this.productService.all(dto);
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.productService.getBySlug(slug);
  }

  @Get(':id')
  async get(@Param('id', new ParseUUIDPipe()) productId: string) {
    return this.productService.get(productId);
  }

  @DevOnly()
  @Auth()
  @Post()
  async create(@Body() dto: CreateProductDto) {
    await this.productService.create(dto);
    return { message: 'Product has been successfully added' };
  }
}
