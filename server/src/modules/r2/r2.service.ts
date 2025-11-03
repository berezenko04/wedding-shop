import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import axios from 'axios';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class R2Service {
  private s3: S3Client;
  private bucket: string;
  private apiEndpoint: string;

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.getOrThrow<string>('R2_BUCKET');
    this.apiEndpoint = this.configService.getOrThrow<string>('S3_API');

    this.s3 = new S3Client({
      region: 'auto',
      endpoint: this.apiEndpoint,
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('R2_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>(
          'R2_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  async uploadFromUrl(imageUrl: string): Promise<{ key: string; url: string }> {
    try {
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });
      const buffer = Buffer.from(response.data);
      const webpBuffer = await sharp(buffer).webp({ quality: 100 }).toBuffer();
      const key = `uploads/${uuidv4()}.webp`;

      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: webpBuffer,
          ContentType: 'image/webp',
        }),
      );

      const url = `${this.configService.get<string>('S3_API')}/${key}`;

      return { key, url };
    } catch (error) {
      console.error('❌ Upload failed:', error.message);
      throw new HttpException('Failed to upload image', HttpStatus.BAD_REQUEST);
    }
  }
}
