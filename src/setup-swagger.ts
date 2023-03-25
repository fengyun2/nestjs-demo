import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  // 设置swagger文档
  const swaggerConfig = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .setTermsOfService('https://docs.nestjs.cn/8/introduction')
    .setLicense('MIT', 'https://github.com/fengyun2/nestjs-demo')
    // .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger-ui', app, swaggerDocument);
  // 打印swagger地址
  console.log('http://localhost:3000/swagger-ui/');
  // 文档访问地址：http://localhost:3000/swagger-ui/
}
