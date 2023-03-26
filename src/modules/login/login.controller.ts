import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReqLoginDto } from './dto/req-login.dto';
import { LoginService } from './login.service';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AuthService } from '../system/auth/auth.service';
import { Public } from '../../common/decorators/public.decorator';
import type { Request } from 'express';

@ApiTags('登录')
@Controller()
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly authService: AuthService,
  ) {}

  // 用户登录
  @Post('/auth/login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() reqLoginDto: ReqLoginDto,
    @Req() req: Request,
  ): Promise<any> {
    // return req.user;
    return this.authService.login(req.user);
  }

  // jwt登录
  @Public()
  @UseGuards(JwtAuthGuard)
  @Get('/auth/profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
