import { Rating } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsString, IsUUID, Length } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  productId: string;

  @IsString()
  @Length(4, 512)
  comment: string;

  @IsEnum(Rating)
  @Type(() => String)
  rating: Rating;
}
