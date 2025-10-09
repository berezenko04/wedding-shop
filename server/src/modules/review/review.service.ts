import { ConflictException, Injectable } from '@nestjs/common';

// services
import { ProductService } from '../product/product.service';
import { PrismaService } from 'src/prisma/prisma.service';

// dto
import { CreateReviewDto } from './dto/create-review.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductService,
  ) {}

  async create(userId: string, dto: CreateReviewDto) {
    await this.productService.get(dto.productId);

    try {
      await this.prisma.review.create({ data: { userId, ...dto } });
    } catch {
      throw new ConflictException('Review is already exist for this product');
    }
  }

  async getProductReviews(productId: string, dto: PaginationDto) {
    const { page, limit } = dto;

    await this.productService.get(productId);

    const [reviews, total] = await this.prisma.$transaction([
      this.prisma.review.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { productId },
        select: { id: true, userId: true, comment: true, rating: true },
      }),
      this.prisma.review.count({ where: { productId } }),
    ]);

    return { reviews, total };
  }

  async getMineReviews(userId: string, dto: PaginationDto) {
    const { page, limit } = dto;

    const [reviews, total] = await this.prisma.$transaction([
      this.prisma.review.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { userId },
        select: { id: true, userId: true, comment: true, rating: true },
      }),
      this.prisma.review.count({ where: { userId } }),
    ]);

    return { reviews, total };
  }
}
