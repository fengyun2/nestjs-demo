import { Module } from '@nestjs/common';
import { GirlModule } from './girl/girl.module';
import { TypeOrmConfig } from './config/typeorm';

@Module({
  imports: [TypeOrmConfig, GirlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
