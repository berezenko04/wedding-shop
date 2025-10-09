import { ConflictException, Injectable } from '@nestjs/common';

// services
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from '../product/product.service';

// decorators
import { Auth } from '../auth/decorators/auth.decorator';

@Injectable()
@Auth()
export class WishlistService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductService,
  ) {}

  async addToWishlist(userId: string, productId: string) {
    await this.productService.get(productId);

    try {
      await this.prisma.wishlist.create({ data: { userId, productId } });
    } catch {
      throw new ConflictException('Product is already exist in wishlist');
    }
  }
}
