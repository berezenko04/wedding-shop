import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Parser } from 'json2csv';

// services
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentService } from '../payment/payment.service';
import { AddressService } from '../address/address.service';

// dto
import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

// utils
import { generateTrackingNumber } from 'src/utils/generateTrackingNumber';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentService: PaymentService,
    private readonly addressService: AddressService,
  ) {}

  async create(userId: string, dto: CreateOrderDto) {
    const { shippingAddressId, shippingMethod, paymentMethodId } = dto;

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

    const { method } = await this.paymentService.get(userId, paymentMethodId);

    const { address } = await this.addressService.get(
      userId,
      shippingAddressId,
    );

    const order = await this.prisma.order.create({
      data: {
        userId,
        shippingAddress: address,
        shippingMethod,
        trackingNumber: generateTrackingNumber(),
        paymentMethod: method,
      },
    });

    const orderItemsData = cart.items.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
      size: item.size,
      discount: item.product.discount,
    }));

    await this.prisma.orderItem.createMany({ data: orderItemsData });

    await this.prisma.cart.delete({ where: { userId } });

    return { orderNumber: order.orderNumber };
  }

  async all(userId: string, dto: PaginationDto) {
    const { page, limit } = dto;

    const [orders, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        skip: (page - 1) * limit,
        take: limit,
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
      }),
      this.prisma.order.count({ where: { userId } }),
    ]);

    return { orders, total };
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
