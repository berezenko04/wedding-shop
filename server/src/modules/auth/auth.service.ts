import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { randomInt } from 'crypto';
import * as bcrypt from 'bcrypt';

// services
import { PrismaService } from 'src/prisma/prisma.service';
import { LogService } from 'src/common/logging/log.service';

// dto
import { CreateSessionDto } from './dto/create-session.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logService: LogService,
    private readonly mailerService: MailerService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return null;

    return user;
  }

  private createResetToken(userId: string) {
    return this.jwtService.sign(
      { id: userId, type: 'reset' },
      {
        secret: this.configService.get<string>('JWT_RESET_SECRET'),
        expiresIn: '15m',
      },
    );
  }

  private verifyResetToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_RESET_SECRET'),
      });
      if (payload.type !== 'reset') throw new Error('Invalid token type');
      return payload.id;
    } catch (err) {
      console.error('JWT verification error:', err);
      throw new Error('Invalid or expired token');
    }
  }

  private async generateTokens(userId: string) {
    const payload = { id: userId };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async createSession(data: CreateSessionDto) {
    await this.prisma.session.create({ data });
  }

  async register(dto: RegisterDto) {
    const { email, password } = dto;
    this.logger.log(`Register attempt with email: ${email}`);

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      this.logger.error('User with this email already exists');

      await this.logService.write({
        level: 'ERROR',
        action: 'auth.register',
        status: 'fail',
        message: 'User already exists',
        metadata: { dto },
      });

      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });
    this.logger.log(`Registration successful with email: ${user.email}`);

    await this.logService.write({
      level: 'INFO',
      action: 'auth.register',
      userId: user.id,
      status: 'success',
    });
  }

  async login({ email, password }: LoginDto) {
    this.logger.log(`Login attempt: ${email}`);

    const user = await this.validateUser(email, password);
    if (!user) {
      this.logger.warn(`Login failed: ${email}`);

      await this.logService.write({
        level: 'SECURITY',
        action: 'auth.login',
        status: 'fail',
        message: 'Invalid credentials',
        metadata: { email },
      });

      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = await this.generateTokens(user.id);
    this.logger.log(`Login success: ${user.id}`);

    await this.logService.write({
      level: 'INFO',
      action: 'auth.login',
      userId: user.id,
      status: 'success',
    });

    return { ...tokens, userId: user.id };
  }

  async refreshTokens(userId: string, oldRefreshToken: string) {
    const session = await this.prisma.session.findUnique({
      where: { refreshToken: oldRefreshToken },
    });

    if (!session || session.userId !== userId) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { accessToken, refreshToken } = await this.generateTokens(userId);

    await this.prisma.session.update({
      where: { id: session.id },
      data: {
        refreshToken,
        expiresAt: new Date(
          Date.now() +
            parseInt(this.configService.get<string>('JWT_REFRESH_EXPIRY')!),
        ),
      },
    });

    return { accessToken, refreshToken };
  }

  async sendForgotPasswordOtp(email: string) {
    this.logger.log(`Password reset request: ${email}`);

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      this.logger.warn(
        `Password reset request for non-existent user: ${email}`,
      );
      return;
    }

    const otp = randomInt(1000, 9999);

    await this.prisma.passwordReset.deleteMany({
      where: { userId: user.id, used: false },
    });

    await this.prisma.passwordReset.create({
      data: {
        userId: user.id,
        otp: otp.toString(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 30),
      },
    });

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset password',
      template: 'forgot-password',
      context: {
        email,
        otp,
      },
    });

    this.logger.log(`Password reset email sent: ${user.id}`);
    await this.logService.write({
      level: 'INFO',
      action: 'auth.forgotPassword',
      userId: user.id,
      status: 'success',
    });
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const { otp, email } = dto;
    this.logger.log(`Verify otp attempt with otp: ${otp}...`);

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const resetData = await this.prisma.passwordReset.findFirst({
      where: {
        userId: user.id,
        otp,
        expiresAt: { gte: new Date() },
        used: false,
      },
    });

    if (!resetData) {
      this.logger.warn(`Invalid or expired reset token: ${otp}...`);
      await this.logService.write({
        level: 'SECURITY',
        action: 'auth.',
        status: 'fail',
        message: 'Invalid or expired reset token',
      });
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    await this.prisma.passwordReset.update({
      where: { id: resetData.id },
      data: { used: true },
    });

    return this.createResetToken(user.id);
  }

  async resetPassword(dto: ResetPasswordDto) {
    const { resetToken, password } = dto;
    this.logger.log(`Password reset attempt with token: ${resetToken}...`);

    const userId = this.verifyResetToken(resetToken);

    if (!userId) {
      this.logger.warn(`Invalid or expired reset token: ${resetToken}...`);
      await this.logService.write({
        level: 'SECURITY',
        action: 'auth.resetPassword',
        status: 'fail',
        message: 'Invalid or expired reset token',
      });
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    const newPasswordHash = await bcrypt.hash(password, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash },
    });

    this.logger.log(`Password reset successful: ${userId}`);
    await this.logService.write({
      level: 'INFO',
      action: 'auth.resetPassword',
      userId,
      status: 'success',
    });
  }

  async logout(refreshToken: string) {
    if (!refreshToken) return;

    const session = await this.prisma.session.findUnique({
      where: { refreshToken },
    });

    if (session) {
      await this.prisma.session.delete({ where: { refreshToken } });
      this.logger.log(`Logout is succesful for user: ${session.userId}`);
      await this.logService.write({
        level: 'INFO',
        action: 'auth.logout',
        userId: session.userId,
        status: 'success',
      });
    }
  }

  async logoutFromAnotherSession(userId: string, sessionId: string) {
    this.logger.log(`Logout attempt session with id: ${sessionId}`);
    await this.prisma.session.delete({
      where: { id: sessionId, userId },
    });
    this.logger.log(`Logout session with id successful: ${sessionId}`);
    await this.logService.write({
      level: 'INFO',
      action: 'auth.logoutId',
      userId,
      message: 'success',
    });
  }

  async logoutAll(userId: string, refreshToken: string) {
    this.logger.log(`Logout all sessions attempt user: ${userId}`);
    await this.prisma.session.deleteMany({
      where: { userId, NOT: { refreshToken } },
    });
    this.logger.log(`Logout all sessions is successful user: ${userId}`);
    await this.logService.write({
      level: 'INFO',
      action: 'auth.logoutAll',
      userId,
      message: 'success',
    });
  }
}
