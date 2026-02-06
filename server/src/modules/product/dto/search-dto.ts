import { IsString, Length } from 'class-validator';

export class SearchDto {
  @IsString()
  @Length(1, 32)
  text: string;
}
