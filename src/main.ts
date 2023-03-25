import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform/transform.interceptor';
import { setupSwagger } from './setup-swagger';
// 1. 使用自定义类验证器
// import { ValidationPipe } from './core/pipes/validation/validation.pipe';
// 2. 使用内置的 ValidationPipe
import { ValidationPipe } from '@nestjs/common';

function MiddleWareAll(req: any, res: any, next: any) {
  console.log('我是全局中间件...');
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cors());
  app.use(MiddleWareAll);

  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 注册全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 注册管道验证dto
  app.useGlobalPipes(new ValidationPipe());

  // 启动swagger
  setupSwagger(app);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
