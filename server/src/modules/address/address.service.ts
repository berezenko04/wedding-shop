import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

// service
import { PrismaService } from 'src/prisma/prisma.service';

// dto
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateAddressDto) {
    try {
      const addressesCount = await this.prisma.shippingAddress.count({
        where: { userId },
      });

      if (addressesCount >= 3) {
        throw new BadRequestException('You can have a maximum of 3 addresses');
      }

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

  async get(userId: string, addressId: string) {
    try {
      return this.prisma.shippingAddress.findUnique({
        where: { id: addressId, userId },
        select: { address: true, primary: true },
      });
    } catch {
      throw new NotFoundException('Address is not found');
    }
  }

  async update(userId: string, dto: UpdateAddressDto) {
    const { addressId, address, primary } = dto;
    await this.get(userId, addressId);

    try {
      await this.prisma.shippingAddress.update({
        where: { id: addressId, userId },
        data: { primary, address },
      });
    } catch {
      throw new ConflictException('You are already have a primary address');
    }
  }

  async delete(userId: string, addressId: string) {
    await this.get(userId, addressId);

    await this.prisma.shippingAddress.delete({
      where: { id: addressId, userId },
    });
  }
}
