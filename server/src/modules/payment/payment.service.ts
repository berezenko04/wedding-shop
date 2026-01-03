import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

// services
import { PrismaService } from 'src/prisma/prisma.service';

// dto
import { AddPaymentDto } from './dto/add-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

// types
import { PaymentMethods } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async add(userId: string, dto: AddPaymentDto) {
    const { primary, method } = dto;

    const existingPayments = await this.prisma.payment.findMany({
      where: { userId },
    });

    const countByMethod = existingPayments.reduce(
      (acc, p) => {
        acc[p.method] = (acc[p.method] || 0) + 1;
        return acc;
      },
      {} as Record<PaymentMethods, number>,
    );

    const methodLimits: Record<PaymentMethods, number> = {
      [PaymentMethods.CARD]: 2,
      [PaymentMethods.PAYPAL]: 1,
      [PaymentMethods.AMAZON]: 1,
    };

    if ((countByMethod[method] ?? 0) >= methodLimits[method]) {
      throw new BadRequestException(
        `You can have up to ${methodLimits[method]} ${method.toLowerCase()}${
          methodLimits[method] > 1 ? 's' : ''
        } only`,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      if (primary) {
        await tx.payment.updateMany({
          where: { userId },
          data: { primary: false },
        });
      }

      const isFirst = existingPayments.length === 0;

      return tx.payment.create({
        data: {
          ...dto,
          userId,
          primary: isFirst ? true : primary,
        },
      });
    });
  }

  async all(userId: string) {
    const methods = await this.prisma.payment.findMany({
      where: { userId },
      select: {
        id: true,
        method: true,
        email: true,
        cardExp: true,
        cardNumber: true,
      },
    });

    return methods.map(({ cardNumber, ...rest }) => {
      if (!cardNumber) {
        return { ...rest, cardNumber };
      }

      return {
        ...rest,
        cardNumber: `****${cardNumber?.slice(-4)}`,
      };
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

  async update(userId: string, dto: UpdatePaymentDto) {
    const { paymentId, primary } = dto;

    await this.get(userId, paymentId);

    await this.prisma.$transaction(async (tx) => {
      await tx.payment.updateMany({
        where: { userId, primary: true, id: { not: paymentId } },
        data: { primary: false },
      });
      await tx.payment.update({
        where: { id: paymentId },
        data: { primary },
      });
    });
  }

  async delete(userId: string, paymentId: string) {
    await this.get(userId, paymentId);

    return this.prisma.payment.delete({
      where: { id: paymentId, userId },
    });
  }
}
