import { Body, Controller, Post } from '@nestjs/common';

// services
import { ReviewService } from './review.service';

// decorators
import { User } from 'src/common/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';

// dto
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @Auth()
  async create(@User('id') userId: string, @Body() dto: CreateReviewDto) {
    await this.reviewService.create(userId, dto);
    return { message: 'Review was created' };
  }
}
