import {
  Controller,
  Get,
  Post,
  Request,
  Query,
  Body,
  Param,
  Headers,
} from '@nestjs/common';
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
  @Get('/findGirlById/:id/:name')
  findGirlById(@Param() params, @Headers() header): any {
    console.log(params.name);
    console.log(header);
    const id: number = parseInt(params.id);
    return this.girlService.getGirlById(id);
  }
  @Get('/delete/:id')
  deleteGirl(@Param() params): any {
    const id: number = parseInt(params.id, 10);
    return this.girlService.delGirl(id);
  }
  @Get('/update/:id')
  updateGirl(@Param() params): any {
    const id: number = parseInt(params.id, 10);
    return this.girlService.updateGirl(id);
  }
  @Get('findGirlByName/:name')
  findGirlByName(@Param() params): any {
    console.log(params.name);
    const name: string = params.name;
    return this.girlService.getGirlByName(name);
  }
  @Get('/hotLoad')
  hotLoad(): any {
    return 'HotLoad Function';
  }
  @Get('/corstest')
  corsTest(): object {
    return { code: 0, message: '测试跨域请求成功' };
  }
}
