import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from '../product/product.service';

// dto
import { UpdateCartDto } from './dto/update-cart.dto';
import { DeleteFromCartDto } from './dto/delete-from-cart.dto';

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductService,
  ) {}

  async getCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      select: {
        items: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            quantity: true,
            size: true,
            product: {
              select: {
                id: true,
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

  async updateCart(userId: string, dto: UpdateCartDto) {
    const { productId, size, change } = dto;

    const product = await this.productService.get(productId);

    if (product.category.name !== 'Accessories') {
      const isSizeAvailable = await this.prisma.product.findUnique({
        where: { id: productId, sizes: { has: size } },
      });

      if (!isSizeAvailable) {
        throw new NotFoundException(
          `Size ${size} is not found for this product`,
        );
      }
    }

    const cart = await this.prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        size: size ?? null,
      },
    });

    if (existingItem) {
      let newQuantity = existingItem.quantity + change;

      if (newQuantity < 1) newQuantity = 1;
      if (newQuantity > 5) newQuantity = 5;

      await this.prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: newQuantity,
        },
      });
    } else if (change > 0) {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          size,
          quantity: 1,
        },
      });
    }
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
