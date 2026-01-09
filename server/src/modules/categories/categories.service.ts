import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

// service
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

// dto
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async all() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async create(userId: string, dto: CreateCategoryDto) {
    if (userId !== this.configService.getOrThrow<string>('ADMIN_UUID')) {
      throw new ForbiddenException(
        'You do not have permission to delete categories',
      );
    }

    try {
      return await this.prisma.category.create({
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

  async remove(userId: string, categoryId: string) {
    if (userId !== this.configService.getOrThrow<string>('ADMIN_UUID')) {
      throw new ForbiddenException(
        'You do not have permission to delete categories',
      );
    }

    return this.prisma.category.delete({ where: { id: categoryId } });
  }
}
