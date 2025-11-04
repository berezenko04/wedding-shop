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
// import { ProductsSortBy } from 'src/types/enums';

// utils
import { createSlug } from 'src/utils/createSlug';
import { ProductsSortBy } from 'src/types/enums';

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

    const normalizedSort = (sortBy ? String(sortBy) : '')
      .toLowerCase()
      .replace('-', '_') as ProductsSortBy;

    if (
      normalizedSort === ProductsSortBy.PRICE_ASC ||
      normalizedSort === ProductsSortBy.PRICE_DESC
    ) {
      const [allMatching, total] = await this.prisma.$transaction([
        this.prisma.product.findMany({
          where,
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

      const toFinalPrice = (p: { price: number; discount: number | null }) => {
        if (!p.discount || p.discount <= 0) return p.price;
        return p.price * (1 - p.discount);
      };

      allMatching.sort((a, b) => {
        const ap = toFinalPrice(a);
        const bp = toFinalPrice(b);
        return normalizedSort === ProductsSortBy.PRICE_ASC ? ap - bp : bp - ap;
      });

      const offset = (page - 1) * limit;
      const paginated = allMatching.slice(offset, offset + limit);

      return { data: paginated, total };
    }

    let orderBy: any = {};
    switch (sortBy) {
      case ProductsSortBy.PRICE_ASC:
        orderBy = { price: 'asc' };
        break;
      case ProductsSortBy.PRICE_DESC:
        orderBy = { price: 'desc' };
        break;
      default:
        orderBy = { id: 'desc' };
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
      const uploadedPoster = await this.r2Service.uploadFromUrl(rest.posterUrl);

      product = await this.prisma.product.create({
        data: {
          ...rest,
          slug: createSlug(rest.title),
          posterUrl: uploadedPoster,
        },
      });
    } catch {
      throw new ConflictException("Product can't have the same slug");
    }

    if (screenshots && screenshots.length > 0) {
      const uploadedScreenshots = await Promise.all(
        screenshots.map(async (url) => {
          const uploadedUrl = await this.r2Service.uploadFromUrl(url);
          return uploadedUrl;
        }),
      );

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
