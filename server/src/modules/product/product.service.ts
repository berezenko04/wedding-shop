import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from 'src/prisma/prisma.service';

// dto
import { GetAllProductsDto } from './dto/get-all-products.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async all(dto: GetAllProductsDto) {
    const { page, limit, minPrice, maxPrice, size } = dto;

    const where: any = {};

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (size) {
      where.sizes = { has: size };
    }

    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        select: {
          id: true,
          posterUrl: true,
          title: true,
          price: true,
          discount: true,
          available: true,
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return { data: products, total };
  }

  async get(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Product is not found');
    return product;
  }
}
