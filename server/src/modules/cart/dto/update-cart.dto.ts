import { Sizes } from '@prisma/client';
import { IsEnum, IsIn, IsInt, IsOptional, IsUUID } from 'class-validator';

export class UpdateCartDto {
  @IsUUID()
  productId: string;

  @IsOptional()
  @IsEnum(Sizes)
  size: Sizes | null;

  @IsInt()
  @IsIn([1, -1], { message: 'Change must be either 1 or -1' })
  change: 1 | -1;
}
