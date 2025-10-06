import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

// services
import { PrismaService } from 'src/prisma/prisma.service';
import { LogService } from 'src/common/logging/log.service';

// dto
import { CreateSessionDto } from './dto/create-session.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logService: LogService,
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

  private async generateTokens(userId: string) {
    const payload = { sub: userId };
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

    return { id: user.id, email: user.email };
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
}
