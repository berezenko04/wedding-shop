import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

// services
import { AddressService } from './address.service';

// decorators
import { User } from 'src/common/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';

// dto
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
@Auth()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@User('id') userId: string, @Body() dto: CreateAddressDto) {
    await this.addressService.create(userId, dto);
    return { message: 'Address is created' };
  }

  @Get()
  async all(@User('id') userId: string) {
    return this.addressService.all(userId);
  }

  @Get(':id')
  async get(
    @User('id') userId: string,
    @Param('id', new ParseUUIDPipe()) addressId: string,
  ) {
    return this.addressService.get(userId, addressId);
  }

  @Patch()
  async update(@User('id') userId: string, @Body() dto: UpdateAddressDto) {
    await this.addressService.update(userId, dto);
    return { message: 'Address was successfully updated' };
  }
}
