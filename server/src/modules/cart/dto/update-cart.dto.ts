import { Sizes } from '@prisma/client';
import { IsEnum, IsIn, IsInt, IsUUID } from 'class-validator';

export class UpdateCartDto {
  @IsUUID()
  productId: string;

  @IsEnum(Sizes)
  size: Sizes;

  @IsInt()
  @IsIn([1, -1], { message: 'Change must be either 1 or -1' })
  change: 1 | -1;
}
