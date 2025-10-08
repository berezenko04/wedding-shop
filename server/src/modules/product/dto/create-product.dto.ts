import { Genders, Sizes } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsPositive,
  IsString,
  IsUrl,
  Length,
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

  @IsEnum(Genders)
  sex: Genders;

  @IsEnum(Sizes, { each: true })
  sizes: Sizes[];

  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  screenshots: string[];
}
