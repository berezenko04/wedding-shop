import { Sizes } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsUUID()
  categoryId: string;

  @IsUrl()
  posterUrl: string;

  @IsString()
  @Length(2, 64)
  title: string;

  @IsString()
  @Length(10, 1024)
  description: string;

  @IsBoolean()
  available: boolean;

  @IsInt()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(1)
  discount?: number | null;

  @IsOptional()
  @IsArray()
  @IsEnum(Sizes, { each: true })
  sizes?: Sizes[];

  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  screenshots: string[];
}
