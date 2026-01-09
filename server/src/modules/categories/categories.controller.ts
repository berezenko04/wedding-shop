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
    await this.categoriesService.create(dto);
    return { message: `Category successfully created` };
  }

  @Auth()
  @Delete(':id')
  async remove(@Param('id') categoryId: string) {
    await this.categoriesService.remove(categoryId);
    return { message: `Category with id = ${categoryId} successfully deleted` };
  }
}
