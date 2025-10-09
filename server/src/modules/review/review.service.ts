import { ConflictException, Injectable } from '@nestjs/common';

// dto
import { CreateReviewDto } from './dto/create-review.dto';

// services
import { ProductService } from '../product/product.service';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async getProductReviews(productId: string) {
    await this.productService.get(productId);
    return this.prisma.review.findMany({
      where: { productId },
      select: { id: true, userId: true, comment: true, rating: true },
      take: 10,
    });
  }
}
