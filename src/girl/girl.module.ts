import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Girl } from './entities/girl.entity';
import { GirlController } from './girl.controller';
import { GirlService } from './girl.service';

@Module({
  imports: [TypeOrmModule.forFeature([Girl])],
  controllers: [GirlController],
  providers: [GirlService],
})
export class GirlModule {}
