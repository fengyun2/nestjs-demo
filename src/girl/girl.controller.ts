import { Controller, Get, Post, Request, Query, Body } from '@nestjs/common';
import { GirlService } from './girl.service';

@Controller('girl')
export class GirlController {
  constructor(private girlService: GirlService) {}
  @Get()
  getGirls(): any {
    return this.girlService.getGirls();
  }
  @Post('/add')
  addGirl(@Body() body): any {
    console.log(body);
    return this.girlService.addGirl();
  }
  @Get('/getGirlById')
  getGirlById(@Query() query): any {
    // 因为通过 Get 放松传递过来的是字符串，所以我们需要用 parseInt 转化为数字
    const id: number = parseInt(query.id, 10);
    return this.girlService.getGirlById(id);
  }
}
