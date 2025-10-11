import { ConflictException, Injectable } from '@nestjs/common';

// service
import { PrismaService } from 'src/prisma/prisma.service';

// dto
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateAddressDto) {
    try {
      await this.prisma.shippingAddress.create({ data: { userId, ...dto } });
    } catch (err) {
      console.log(err);
      throw new ConflictException('You are already have a primary address');
    }
  }

  async all(userId: string) {
    return this.prisma.shippingAddress.findMany({
      where: { userId },
      select: { id: true, address: true, primary: true },
    });
  }
}
