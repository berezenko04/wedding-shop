import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

// services
import { AuthService } from './auth.service';
import { LogService } from 'src/common/logging/log.service';

// modules
import { MailModule } from '../mailer/mailer.module';
import { GeoModule } from '../geo/geo.module';

// controllers
import { AuthController } from './auth.controller';

@Global()
@Module({
  imports: [
    PassportModule,
    MailModule,
    GeoModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_ACCESS_SECRET'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LogService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
