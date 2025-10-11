import { Body, Controller, Post } from '@nestjs/common';

// services
import { AddressService } from './address.service';

// decorators
import { User } from 'src/common/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';

// dto
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('address')
@Auth()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@User('id') userId: string, @Body() dto: CreateAddressDto) {
    await this.addressService.create(userId, dto);
    return { message: 'Address is created' };
  }
}
