/**
 * 公共模块
 */

import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedService } from './shared.service';

@Global()
@Module({
  imports: [
    // 连接mysql数据库
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        console.log('database: ==> ', configService.get('database'));
        return {
          autoLoadEntities: true,
          type: configService.get<any>('database.type'),
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          autoLoadModels: configService.get<boolean>('database.autoLoadModels'),
          synchronize: configService.get<boolean>('database.synchronize'),
          logging: configService.get('database.logging'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [SharedService],
})
export class SharedModule {}
