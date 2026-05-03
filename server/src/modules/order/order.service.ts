import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Parser } from 'json2csv';
import { ShipmentStatuses } from '@prisma/client';

// services
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentService } from '../payment/payment.service';
import { AddressService } from '../address/address.service';
import { StripeService } from '../stripe/stripe.service';

// dto
import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

// utils
import { generateTrackingNumber } from 'src/utils/generateTrackingNumber';

// constants
import { DELIVERY_COST } from 'src/constants';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentService: PaymentService,
    private readonly addressService: AddressService,
    private readonly stripeService: StripeService,
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

    const subtotal = cart.items.reduce(
      (acc, i) =>
        acc + i.product.price * (1 - (i.product.discount ?? 0)) * i.quantity,
      0,
    );

    const {
      orderNumber,
      id,
      subtotal: orderSubtotal,
    } = await this.prisma.order.create({
      data: {
        userId,
        shippingAddress: address,
        shippingMethod,
        trackingNumber: generateTrackingNumber(),
        paymentMethod: method,
        subtotal,
      },
    });

    const orderItemsData = cart.items.map((item) => ({
      orderId: id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
      size: item.size,
      discount: item.product.discount,
    }));

    await this.prisma.orderItem.createMany({ data: orderItemsData });

    await this.prisma.cart.delete({ where: { userId } });

    const session = await this.stripeService.createCheckoutSession(
      orderNumber,
      Math.round(orderSubtotal * 100) + DELIVERY_COST,
    );

    return { orderNumber, url: session.url };
  }

  async all(userId: string, dto: PaginationDto) {
    const { page, limit } = dto;

    const [orders, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { orderNumber: 'desc' },
        where: { userId },
        include: {
          items: {
            select: {
              id: true,
              quantity: true,
              price: true,
              discount: true,
              size: true,
              product: {
                select: {
                  posterUrl: true,
                  title: true,
                },
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

  async exportAllToCsv(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      select: {
        orderNumber: true,
        createdAt: true,
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

    if (!orders.length) {
      throw new NotFoundException('Orders not found');
    }

    const rows = orders.flatMap((order) =>
      order.items.map((item) => ({
        orderNumber: order.orderNumber,
        createdAt: order.createdAt.toISOString(),
        title: item.product.title,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount ?? 0,
        size: item.size,
      })),
    );

    const parser = new Parser({
      fields: [
        'orderNumber',
        'createdAt',
        'title',
        'quantity',
        'price',
        'discount',
        'size',
      ],
    });

    return parser.parse(rows);
  }

  async markAsPaid(orderId: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: ShipmentStatuses.DELIVERED },
    });
  }
}
