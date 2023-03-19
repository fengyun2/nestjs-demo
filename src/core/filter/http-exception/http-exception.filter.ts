import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';

/**
 * 拦截错误请求
 * @example  throw new HttpException('女孩已存在', 401);
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const request = ctx.getRequest<Request>(); // 获取请求上下文中的 request 对象
    const response = ctx.getResponse<Response>(); // 获取请求上下文中的 response 对象
    const status = exception.getStatus(); // 获取异常状态码

    // 设置错误信息
    const message = exception.message
      ? exception.message
      : `${status >= 500} ? 'Service Error': 'Client Error'`;
    const errorResponse = {
      data: {},
      message,
      time: new Date().getTime(),
      path: request.url, // 原始 url
      success: false,
      code: -1,
    };
    // 设置返回的状态码，请求头，发送错误信息
    response.status(status);
    response.json(errorResponse);
    // response.header('Content-Type', 'application/json;charset=utf-8');
    // response.send(errorResponse);
  }
}
