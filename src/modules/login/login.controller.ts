import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReqLoginDto } from './dto/req-login.dto';
import { LoginService } from './login.service';
import { Request } from 'express';

@ApiTags('登录')
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  // 用户登录
  @Post('/auth/login')
  @UseGuards(AuthGuard('local'))
  async login(
    @Body() reqLoginDto: ReqLoginDto,
    @Req() req: Request,
  ): Promise<any> {
    return req.user;
  }
}
