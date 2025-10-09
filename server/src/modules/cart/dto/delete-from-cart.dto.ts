import { IsUUID } from 'class-validator';

export class DeleteFromCartDto {
  @IsUUID()
  itemId: string;
}
