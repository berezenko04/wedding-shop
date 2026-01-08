import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as cardValidator from 'card-validator';

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
    const { primary, method, cardNumber } = dto;

    let cardIssuer: string | null = null;
    let last4: string | null = null;

    if (method === PaymentMethods.CARD && cardNumber) {
      const validation = cardValidator.number(cardNumber);

      cardIssuer = validation.card?.type ?? null;
      last4 = cardNumber.slice(-4);
    }

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
          userId,
          method: dto.method,
          primary: isFirst ? true : primary,
          email: dto.email,
          cardIssuer,
          cardHolder: dto.cardHolder,
          last4,
        },
      });
    });
  }

  async all(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId },
      select: {
        id: true,
        primary: true,
        method: true,
        email: true,
        cardIssuer: true,
        cardHolder: true,
        last4: true,
        createdAt: true,
      },
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

    if (primary === false) {
      const primaryCount = await this.prisma.payment.count({
        where: {
          userId,
          primary: true,
        },
      });

      if (primaryCount === 1) {
        throw new BadRequestException(
          'At least one primary payment method is required',
        );
      }
    }

    await this.prisma.$transaction(async (tx) => {
      if (primary === true) {
        await tx.payment.updateMany({
          where: {
            userId,
            primary: true,
            id: { not: paymentId },
          },
          data: { primary: false },
        });
      }

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
