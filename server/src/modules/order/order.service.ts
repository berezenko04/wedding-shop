import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Parser } from 'json2csv';

// services
import { PrismaService } from 'src/prisma/prisma.service';

// dto
import { CreateOrderDto } from './dto/create-order.dto';

// utils
import { generateTrackingNumber } from 'src/utils/generateTrackingNumber';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrderDto) {
    const { shippingAddress, shippingMethod, paymentMethod } = dto;

    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const order = await this.prisma.order.create({
      data: {
        userId,
        shippingAddress,
        shippingMethod,
        trackingNumber: generateTrackingNumber(),
        paymentMethod,
      },
    });

    const orderItemsData = cart.items.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
      size: item.size,
    }));

    await this.prisma.orderItem.createMany({ data: orderItemsData });

    await this.prisma.cart.delete({ where: { userId } });
  }

  async all(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      select: {
        id: true,
        orderNumber: true,
        shippingAddress: true,
        shippingMethod: true,
        trackingNumber: true,
        paymentMethod: true,
        createdAt: true,
        items: {
          select: {
            quantity: true,
            price: true,
            discount: true,
            size: true,
            product: {
              select: { posterUrl: true, title: true },
            },
          },
        },
      },
    });
  }

  async exportToCsv(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId, userId },
      select: {
        items: {
          select: {
            quantity: true,
            price: true,
            discount: true,
            size: true,
            product: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order is not found');
    }

    const fields = ['title', 'quantity', 'price', 'discount', 'size'];
    const opts = { fields };
    const parser = new Parser(opts);

    const csv = parser.parse(
      order.items.map((i) => ({
        title: i.product.title,
        quantity: i.quantity,
        price: i.price,
        discount: i.discount ?? 0,
        size: i.size,
      })),
    );

    return csv;
  }
}
