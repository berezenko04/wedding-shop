import { Genders, Sizes } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
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
  @Length(10, 256)
  description: string;

  @IsBoolean()
  available: boolean;

  @IsInt()
  @IsPositive()
  price: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(1)
  discount: number;

  @IsEnum(Genders)
  sex: Genders;

  @IsEnum(Sizes, { each: true })
  sizes: Sizes[];

  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  screenshots: string[];
}
