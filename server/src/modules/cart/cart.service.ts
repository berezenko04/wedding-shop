import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from '../product/product.service';

// dto
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductService,
  ) {}

  async addToCart(userId: string, dto: AddToCartDto) {
    await this.productService.get(dto.productId);

    const { productId, size, quantity } = dto;

    const isSizeAvailable = await this.prisma.product.findUnique({
      where: { id: productId, sizes: { has: size } },
    });

    if (!isSizeAvailable) {
      throw new NotFoundException(`Size ${size} is not found for this product`);
    }

    const cart = await this.prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    const cartItem = await this.prisma.cartItem.upsert({
      where: {
        cartId_productId_size: {
          cartId: cart.id,
          productId,
          size,
        },
      },
      update: {},
      create: {
        cartId: cart.id,
        productId,
        quantity,
        size,
      },
    });

    return cartItem;
  }
}
