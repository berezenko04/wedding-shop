import { Genders, Sizes } from '@prisma/client';
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
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
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

  @IsEnum(Genders)
  sex: Genders;

  @IsEnum(Sizes, { each: true })
  sizes: Sizes[];

  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  screenshots: string[];
}
