import { IsString, IsOptional, IsDate, IsIP } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  userId: string;

  @IsString()
  refreshToken: string;

  @IsOptional()
  @IsIP()
  ip?: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  userAgent?: string;

  @IsOptional()
  @IsString()
  browser?: string;

  @IsOptional()
  @IsString()
  os?: string;

  @IsOptional()
  deviceType?: string;

  @IsDate()
  expiresAt: Date;
}
