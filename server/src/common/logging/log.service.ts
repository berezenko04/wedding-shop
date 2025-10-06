import { Injectable } from '@nestjs/common';

// services
import { PrismaService } from 'src/prisma/prisma.service';

type LogPayload = {
  level: 'INFO' | 'WARN' | 'ERROR' | 'SECURITY';
  action: string;
  entity?: string;
  entityId?: string;
  userId?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  status?: string;
  message?: string;
  metadata?: Record<string, unknown>;
};

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) {}

  async write(payload: LogPayload) {
    const { userId, ...rest } = payload;
    await this.prisma.logs.create({
      data: {
        ...rest,
        userId: userId ?? null,
        metadata: payload.metadata ? (payload.metadata as any) : undefined,
      },
    });
  }
}
