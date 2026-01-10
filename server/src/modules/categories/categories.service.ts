import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

// service
import { PrismaService } from 'src/prisma/prisma.service';

// dto
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async all() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
      select: {
        name: true,
        slug: true,
      },
    });
  }

  async create(dto: CreateCategoryDto) {
    try {
      await this.prisma.category.create({
        data: dto,
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new ConflictException('Category with this slug already exists');
      }

      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async remove(categoryId: string) {
    try {
      await this.prisma.category.delete({ where: { id: categoryId } });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException("Category with this id doesn't exist");
      }
      throw new InternalServerErrorException('Failed to delete category');
    }
  }
}
