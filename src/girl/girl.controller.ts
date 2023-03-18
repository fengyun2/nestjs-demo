import { Controller, Get, Post } from '@nestjs/common';
import { GirlService } from './girl.service';

@Controller('girl')
export class GirlController {
  constructor(private girlService: GirlService) {}
  @Get()
  getGirls(): any {
    return this.girlService.getGirls();
  }
  @Post('/add')
  addGirl(): any {
    return this.girlService.addGirl();
  }
}
