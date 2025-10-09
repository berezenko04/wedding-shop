import { IsUUID } from 'class-validator';

export class DeleteFromCartDto {
  @IsUUID()
  id: string;
}
