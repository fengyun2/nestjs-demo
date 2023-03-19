import { Module } from '@nestjs/common';
import { GirlModule } from './girl/girl.module';
import { TypeOrmConfig } from './config/typeorm';
import { BoyModule } from './boy/boy.module';

@Module({
  imports: [TypeOrmConfig, GirlModule, BoyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
