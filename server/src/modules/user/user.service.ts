import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async get(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        sex: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    return user;
  }
}
