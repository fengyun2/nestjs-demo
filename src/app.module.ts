import { Module } from '@nestjs/common';
import { GirlModule } from './girl/girl.module';
import { TypeOrmConfig } from './config/typeorm';
import { BoyModule } from './boy/boy.module';
import { ConfigModule } from './config/config.module';
@Module({
  imports: [TypeOrmConfig, GirlModule, BoyModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
