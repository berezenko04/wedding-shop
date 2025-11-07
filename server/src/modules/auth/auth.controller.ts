import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

// services
import { AuthService } from './auth.service';
import { GeoService } from '../geo/geo.service';

// dto
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

// guards
import { JwtRefreshGuard } from './guards/refresh.guard';

// decorators
import { IpAddress } from './decorators/ip.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { Auth } from './decorators/auth.decorator';

// utils
import { getDeviceInfo } from 'src/utils/getDeviceInfo';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly geoService: GeoService,
  ) {}

  @Post('register')
  @Throttle({ default: { limit: 2, ttl: 60000 } })
  async register(@Body() dto: RegisterDto) {
    await this.authService.register(dto);
    return { message: 'Registration is successful' };
  }

  @Post('login')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @IpAddress() ip: string,
  ) {
    const { accessToken, refreshToken, userId } =
      await this.authService.login(dto);

    const userAgent = req.headers['user-agent'] || 'unknown';

    const { os, deviceType, browser } = getDeviceInfo(userAgent);

    await this.authService.createSession({
      userId,
      refreshToken,
      ip: ip === '::1' ? '127.0.0.1' : String(ip),
      userAgent,
      os,
      deviceType,
      browser,
      country: (await this.geoService.getCountryByIp(ip)) ?? 'Unknown',
      expiresAt: new Date(
        Date.now() +
          parseInt(this.configService.get<string>('JWT_REFRESH_EXPIRY')!),
      ),
    });

    const isProd = this.configService.get<string>('NODE_ENV') === 'production';

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
      maxAge: isProd
        ? parseInt(this.configService.get<string>('JWT_ACCESS_EXPIRY')!)
        : 15 * 24 * 60 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
      maxAge: parseInt(this.configService.get<string>('JWT_REFRESH_EXPIRY')!),
    });

    return { message: 'Login successful' };
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(
    @User() userId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { accessToken, refreshToken } =
        await this.authService.refreshTokens(userId, req.cookies?.refreshToken);

      const isProd =
        this.configService.get<string>('NODE_ENV') === 'production';

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'strict' : 'lax',
        maxAge: isProd
          ? parseInt(this.configService.get<string>('JWT_ACCESS_EXPIRY')!)
          : 30 * 24 * 60 * 60 * 1000,
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'strict' : 'lax',
        maxAge: parseInt(this.configService.get<string>('JWT_REFRESH_EXPIRY')!),
      });

      return { message: 'Refresh successful' };
    } catch {
      throw new UnauthorizedException('Token refresh failed');
    }
  }

  @Post('forgot-password')
  @Throttle({ default: { limit: 1, ttl: 60000 } })
  async forgotPassword(@Body('email') email: string) {
    await this.authService.sendForgotPasswordOtp(email);
    return { message: 'Reset password mail has been send' };
  }

  @Post('verify-otp')
  @Throttle({ default: { limit: 3, ttl: 180000 } })
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    const resetToken = await this.authService.verifyOtp(dto);
    return { resetToken, message: 'Token is valid' };
  }

  @Post('reset-password')
  @Throttle({ default: { limit: 3, ttl: 180000 } })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto);
    return { message: 'Password was reset is successfully' };
  }

  @Post('change-password')
  @Auth()
  @Throttle({ default: { limit: 3, ttl: 180000 } })
  async changePassword(
    @User('id') userId: string,
    @Body() dto: ChangePasswordDto,
  ) {
    await this.authService.changePassword(userId, dto);
    return { message: 'Password has been successfully changed' };
  }

  @Post('logout')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    res.cookie('accessToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 0,
    });

    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 0,
    });

    await this.authService.logout(refreshToken);

    return { message: 'Successfully logged out' };
  }

  @Post('logout/:id')
  @Auth()
  async logoutAnother(
    @Param('id') sessionId: string,
    @User('id') userId: string,
  ) {
    await this.authService.logoutFromAnotherSession(userId, sessionId);
    return { message: 'Session has been successfully logged out' };
  }

  @Post('logout-all')
  @Throttle({ default: { limit: 3, ttl: 120000 } })
  @Auth()
  async logoutAll(@User('id') userId: string, @Req() req: Request) {
    const refreshToken = req.cookies['refreshToken'];
    await this.authService.logoutAll(userId, refreshToken);
    return {
      message: 'Successfully logged out from all sessions without active',
    };
  }
}
