import { ConflictException, Injectable } from '@nestjs/common';

// services
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from '../product/product.service';

// decorators
import { Auth } from '../auth/decorators/auth.decorator';

// dto
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
@Auth()
export class WishlistService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductService,
  ) {}

  async add(userId: string, productId: string) {
    await this.productService.get(productId);

    try {
      await this.prisma.wishlist.create({ data: { userId, productId } });
    } catch {
      throw new ConflictException('Product is already exist in wishlist');
    }
  }

  async get(userId: string, dto: PaginationDto) {
    const { page, limit } = dto;

    const [wishlist, total] = await this.prisma.$transaction([
      this.prisma.wishlist.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { userId },
        select: {
          id: true,
          product: {
            select: {
              posterUrl: true,
              title: true,
              price: true,
              discount: true,
              available: true,
            },
          },
        },
      }),
      this.prisma.wishlist.count({ where: { userId } }),
    ]);

    return { wishlist, total };
  }
}
