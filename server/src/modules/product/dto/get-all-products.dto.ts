import { Sizes } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

// dto
import { PaginationDto } from 'src/common/dto/pagination.dto';

// decorators
import { MinLessThanMax } from '../decorators/min-less-than-max.decorator';

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

  @IsEnum(Sizes)
  @IsOptional()
  size?: Sizes;
}
