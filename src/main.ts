import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';

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
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
