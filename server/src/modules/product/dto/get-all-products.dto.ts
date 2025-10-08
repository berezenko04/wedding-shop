import { Sizes } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

// dto
import { PaginationDto } from 'src/common/dto/pagination.dto';

// decorators
import { MinLessThanMax } from '../decorators/min-less-than-max.decorator';
import { ProductsSortBy } from 'src/types/enums';

export class GetAllProductsDto extends PaginationDto {
  @Min(0)
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  minPrice?: number;

  @Max(250000)
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @MinLessThanMax('maxPrice')
  maxPrice?: number;

  @IsOptional()
  @IsEnum(ProductsSortBy)
  sortBy?: ProductsSortBy;

  @IsEnum(Sizes)
  @IsOptional()
  size?: Sizes;
}
