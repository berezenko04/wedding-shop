import {
  ArrayNotEmpty,
  IsArray,
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

  @IsInt()
  @IsPositive()
  price: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  screenshots: string[];
}
