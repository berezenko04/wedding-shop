import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

// services
import { ProductService } from '../product/product.service';
import { PrismaService } from 'src/prisma/prisma.service';

// dto
import { CreateReviewDto } from './dto/create-review.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

// utils
import { maskEmail } from 'src/utils/maskEmail';

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

  async getProductRatings(productId: string) {
    await this.productService.get(productId);

    const ratings = await this.prisma.review.groupBy({
      by: ['rating'],
      where: { productId },
      _count: { rating: true },
    });

    const total = ratings.reduce((sum, r) => sum + r._count.rating, 0);

    const distribution = {
      ONE: 0,
      TWO: 0,
      THREE: 0,
      FOUR: 0,
      FIVE: 0,
    };

    for (const r of ratings) {
      distribution[r.rating] = r._count.rating;
    }

    const ratingValues = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
    const average =
      total > 0
        ? ratings.reduce(
            (sum, r) => sum + ratingValues[r.rating] * r._count.rating,
            0,
          ) / total
        : 0;

    return {
      averageRating: Number(average.toFixed(1)),
      totalVotes: total,
      distribution,
    };
  }

  async getProductReviews(productId: string, dto: PaginationDto) {
    const { page, limit } = dto;

    await this.productService.get(productId);

    const [reviews, total] = await this.prisma.$transaction([
      this.prisma.review.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { productId },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          user: { select: { id: true, email: true } },
          comment: true,
          rating: true,
          createdAt: true,
        },
      }),
      this.prisma.review.count({ where: { productId } }),
    ]);

    const maskedReviews = reviews.map((review) => ({
      ...review,
      user: {
        ...review.user,
        email: maskEmail(review.user.email),
      },
    }));

    return { reviews: maskedReviews, total };
  }

  async getMineReviews(userId: string, dto: PaginationDto) {
    const { page, limit } = dto;

    const [reviews, total] = await this.prisma.$transaction([
      this.prisma.review.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { userId },
        select: {
          id: true,
          comment: true,
          rating: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              email: true,
            },
          },
          product: {
            select: {
              title: true,
              slug: true,
            },
          },
        },
      }),
      this.prisma.review.count({ where: { userId } }),
    ]);

    return { reviews, total };
  }

  async deleteReview(userId: string, reviewId: string) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId, userId },
    });

    if (!review) throw new NotFoundException('Review is not found');

    await this.prisma.review.delete({ where: { id: reviewId } });
  }
}
