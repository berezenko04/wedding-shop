import {
  BadRequestException,
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
    const addressesCount = await this.prisma.shippingAddress.count({
      where: { userId },
    });

    if (addressesCount >= 3) {
      throw new BadRequestException('You can have a maximum of 3 addresses');
    }

    const hasPrimary = await this.prisma.shippingAddress.findFirst({
      where: { userId, primary: true },
    });

    let primary = false;

    if (dto.primary) {
      if (hasPrimary) {
        await this.prisma.shippingAddress.update({
          where: { id: hasPrimary.id },
          data: { primary: false },
        });
      }
      primary = true;
    } else if (!hasPrimary) {
      primary = true;
    }

    return this.prisma.shippingAddress.create({
      data: {
        userId,
        address: dto.address,
        primary,
      },
    });
  }

  async all(userId: string) {
    return this.prisma.shippingAddress.findMany({
      where: { userId },
      orderBy: { primary: 'desc' },
      select: { id: true, address: true, primary: true },
    });
  }

  async get(userId: string, addressId: string) {
    const address = await this.prisma.shippingAddress.findUnique({
      where: { id: addressId, userId },
      select: { address: true, primary: true },
    });

    if (!address) {
      throw new NotFoundException('Address is not found');
    }

    return address;
  }

  async update(userId: string, dto: UpdateAddressDto) {
    const { addressId, address, primary } = dto;

    const current = await this.get(userId, addressId);

    if (primary === false && current.primary) {
      const otherPrimary = await this.prisma.shippingAddress.findFirst({
        where: { userId, primary: true, NOT: { id: addressId } },
      });

      if (!otherPrimary) {
        throw new BadRequestException(
          "Cannot remove primary flag from the only primary address"
        );
      }
    }

    if (primary) {
      return this.prisma.$transaction(async (prisma) => {
        await prisma.shippingAddress.updateMany({
          where: { userId, primary: true, NOT: { id: addressId } },
          data: { primary: false },
        });

        return prisma.shippingAddress.update({
          where: { id: addressId, userId },
          data: { primary: true, address },
        });
      });
    }

    return this.prisma.shippingAddress.update({
      where: { id: addressId, userId },
      data: { primary, address },
    });
  }

  async delete(userId: string, addressId: string) {
    const targetAddress = await this.get(userId, addressId);

    const addresses = await this.all(userId);

     if (targetAddress.primary && addresses.length > 1) {
      throw new BadRequestException('You must set another address as primary before deleting this one');
    }
    
    await this.prisma.shippingAddress.delete({
      where: { id: addressId, userId },
    });
  }
}
