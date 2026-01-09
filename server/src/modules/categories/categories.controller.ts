import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

// services
import { CategoriesService } from './categories.service';

// dto
import { CreateCategoryDto } from './dto/create-category.dto';

// decorators
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async all() {
    return this.categoriesService.all();
  }

  @Auth()
  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Auth()
  @Delete(':id')
  async remove(@Param('id') categoryId: string) {
    return this.categoriesService.remove(categoryId);
  }
}
