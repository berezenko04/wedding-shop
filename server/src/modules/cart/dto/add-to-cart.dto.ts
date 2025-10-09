import { Sizes } from '@prisma/client';
import { IsEnum, IsInt, IsUUID, Max, Min } from 'class-validator';

export class AddToCartDto {
  @IsUUID()
  productId: string;

  @IsEnum(Sizes)
  size: Sizes;

  @IsInt()
  @Min(1)
  @Max(5)
  quantity: number;
}
