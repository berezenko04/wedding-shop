import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from '../product/product.service';

// dto
import { AddToCartDto } from './dto/add-to-cart.dto';
import { DeleteFromCartDto } from './dto/delete-from-cart.dto';

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
      update: {
        quantity,
      },
      create: {
        cartId: cart.id,
        productId,
        quantity,
        size,
      },
    });

    return cartItem;
  }

  async getCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      select: {
        items: {
          select: {
            id: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                posterUrl: true,
                price: true,
                discount: true,
              },
            },
          },
        },
      },
    });

    return cart?.items || [];
  }

  async deleteFromCart(userId: string, dto: DeleteFromCartDto) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) throw new NotFoundException('Cart not found');

    try {
      await this.prisma.cartItem.delete({
        where: {
          id: dto.id,
          cartId: cart.id,
        },
      });
    } catch {
      throw new NotFoundException('Item not found in cart');
    }
  }
}
