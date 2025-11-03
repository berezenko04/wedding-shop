import { Module } from '@nestjs/common';
import { R2Service } from './r2.service';

@Module({
  controllers: [],
  providers: [R2Service],
})
export class R2Module {}
