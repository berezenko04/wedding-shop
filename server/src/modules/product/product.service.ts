import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

// services
import { PrismaService } from 'src/prisma/prisma.service';
import { R2Service } from '../r2/r2.service';

// dto
import { GetAllProductsDto } from './dto/get-all-products.dto';
import { CreateProductDto } from './dto/create-product.dto';

// types
import { ProductsSortBy } from 'src/types/enums';

// utils
import { createSlug } from 'src/utils/createSlug';

@Injectable()
export class ProductService {
  constructor(
    private readonly r2Service: R2Service,
    private readonly prisma: PrismaService,
  ) {}

  async all(dto: GetAllProductsDto) {
    const { page, limit, minPrice, maxPrice, size, sortBy, sex } = dto;

    const where: Prisma.ProductWhereInput = {};

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (size) {
      where.sizes = { has: size };
    }

    if (sex) {
      where.sex = sex;
    }

    let orderBy: any = {};

    switch (sortBy) {
      case ProductsSortBy.PRICE_ASC:
        orderBy = { price: 'asc' };
        break;
      case ProductsSortBy.PRICE_DESC:
        orderBy = { price: 'desc' };
        break;
    }

    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        orderBy,
        select: {
          id: true,
          posterUrl: true,
          title: true,
          price: true,
          slug: true,
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

  async getBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        images: {
          select: { id: true, url: true },
        },
      },
    });

    if (!product) throw new NotFoundException('Product is not found');
    return product;
  }

  async create(dto: CreateProductDto) {
    const { screenshots, ...rest } = dto;

    let product;
    try {
      product = await this.prisma.product.create({
        data: { ...rest, slug: createSlug(rest.title) },
      });
    } catch {
      throw new ConflictException("Product can't have the same slug");
    }

    const uploadedScreenshots = await Promise.all(
      (screenshots || []).map(async (url) => {
        const uploaded = await this.r2Service.uploadFromUrl(url);
        return uploaded.url; // <-- это ссылка на твой бакет
      }),
    );

    // 2️⃣ Сохраняем новые URL в базе
    if (uploadedScreenshots.length > 0) {
      await this.prisma.productImage.createMany({
        data: uploadedScreenshots.map((url) => ({
          productId: product.id,
          url,
        })),
      });
    }

    return product;
  }
}
