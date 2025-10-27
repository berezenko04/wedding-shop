import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';

// services
import { ReviewService } from './review.service';

// decorators
import { User } from 'src/common/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';

// dto
import { CreateReviewDto } from './dto/create-review.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @Auth()
  async create(@User('id') userId: string, @Body() dto: CreateReviewDto) {
    await this.reviewService.create(userId, dto);
    return { message: 'Review was created' };
  }

  @Get('product/:productId')
  async getByProduct(
    @Param('productId') productId: string,
    @Query() dto: PaginationDto,
  ) {
    return this.reviewService.getProductReviews(productId, dto);
  }

  @Get('product/:productId/ratings')
  async getRatingsByProduct(@Param('productId') productId: string) {
    return this.reviewService.getProductRatings(productId);
  }

  @Auth()
  @Get('my')
  async getMine(@User('id') userId: string, @Query() dto: PaginationDto) {
    return this.reviewService.getMineReviews(userId, dto);
  }

  @Auth()
  @Delete()
  async delete(
    @User('id') userId: string,
    @Query('id', new ParseUUIDPipe()) reviewId: string,
  ) {
    await this.reviewService.deleteReview(userId, reviewId);
    return { message: 'Review is deleted' };
  }
}
