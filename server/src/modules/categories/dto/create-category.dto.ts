import { IsString, Length, Matches } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(2, 16)
  name: string;

  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Slug must contain only lowercase letters, numbers and hyphens',
  })
  @Length(2, 16)
  slug: string;
}
