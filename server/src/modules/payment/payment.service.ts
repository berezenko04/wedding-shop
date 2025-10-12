import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

// services
import { PrismaService } from 'src/prisma/prisma.service';

// dto
import { AddPaymentDto } from './dto/add-payment.dto';

// types
import { PaymentMethods } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async add(userId: string, dto: AddPaymentDto) {
    const { method } = dto;

    const existingPayments = await this.prisma.payment.findMany({
      where: { userId },
    });

    const countByMethod = existingPayments.reduce(
      (acc, p) => {
        acc[p.method] = (acc[p.method] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    if (
      method === PaymentMethods.CARD &&
      (countByMethod[PaymentMethods.CARD] ?? 0) >= 2
    ) {
      throw new BadRequestException('You can have up to 2 cards only');
    }

    if (
      method === PaymentMethods.PAYPAL &&
      (countByMethod[PaymentMethods.PAYPAL] ?? 0) >= 1
    ) {
      throw new BadRequestException('You can have only 1 PayPal account');
    }

    if (
      method === PaymentMethods.AMAZON &&
      (countByMethod[PaymentMethods.AMAZON] ?? 0) >= 1
    ) {
      throw new BadRequestException('You can have only 1 Amazon Pay account');
    }

    return await this.prisma.payment.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async all(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId },
    });
  }

  async get(userId: string, paymentId: string) {
    try {
      return this.prisma.payment.findUnique({
        where: { id: paymentId, userId },
      });
    } catch {
      throw new NotFoundException('Payment method is not found');
    }
  }
}
