import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Request,
  Query,
  Body,
  Param,
  Headers,
  Inject,
} from '@nestjs/common';
import { GirlService } from './girl.service';
import { BoyService } from './../boy/boy.service';
import { CreateGirlDto } from './dto/create-girl.dto';
import { UpdateGirlDto } from './dto/update-girl.dto';
import { ParseArrayPipe } from '@nestjs/common';

@ApiTags('女孩')
@Controller('girl')
export class GirlController {
  constructor(
    private girlService: GirlService,
    private boyService: BoyService,
  ) {}
  @ApiOperation({ summary: '获取女孩列表' })
  @Get()
  getGirls(): any {
    return this.girlService.getGirls();
  }
  @ApiOperation({ summary: '添加女孩' })
  @Post('/add')
  addGirl(@Body() body: CreateGirlDto): any {
    console.log(body);
    return this.girlService.addGirl(body);
  }
  @ApiOperation({ summary: '根据id获取女孩信息' })
  @Get('/getGirlById')
  getGirlById(@Query() query): any {
    // 因为通过 Get 放松传递过来的是字符串，所以我们需要用 parseInt 转化为数字
    const id: number = parseInt(query.id, 10);
    return this.girlService.getGirlById(id);
  }
  @ApiOperation({ summary: '根据id或名称获取女孩信息' })
  @Get('/findGirlById/:id/:name')
  findGirlById(@Param() params, @Headers() header): any {
    console.log(params.name);
    console.log(header);
    const id: number = parseInt(params.id);
    return this.girlService.getGirlById(id);
  }
  @ApiOperation({ summary: '根据id删除女孩' })
  @Get('/delete/:id')
  deleteGirl(@Param() params): any {
    const id: number = parseInt(params.id, 10);
    return this.girlService.delGirl(id);
  }
  @ApiOperation({ summary: '根据id更新女孩信息' })
  @Get('/update/:id')
  updateGirl(@Param() params, @Body() body: UpdateGirlDto): any {
    const id: number = parseInt(params.id, 10);
    console.log(id, body);
    return this.girlService.updateGirl(id, body);
  }
  @ApiOperation({ summary: '根据name模糊搜索' })
  @Get('findGirlByName/:name')
  findGirlByName(@Param() params): any {
    console.log(params.name);
    const name: string = params.name;
    return this.girlService.getGirlByName(name);
  }
  @ApiOperation({ summary: '测试热更新' })
  @Get('/hotLoad')
  hotLoad(): any {
    return 'HotLoad Function';
  }
  @ApiOperation({ summary: '测试跨域' })
  @Get('/corstest')
  corsTest(): object {
    return { code: 0, message: '测试跨域请求成功' };
  }
  // TypeScript 不存储泛型或接口的原数据，因此当你在 DTO 中使用它们的时候， Validation 可能不能正确验证输入数据。如下：
  // createBulk(@Body() girls: CreateGirlDto[])
  // 要验证数组，创建了一个包裹了该数组的专用类，或者使用 ParseArrayPipe 。
  // createBulk(
  // @Body(new ParseArrayPipe({ items: CreateGirlDto })) girls: CreateGirlDto[],
  // )
  @ApiOperation({ summary: '批量创建' })
  @Post('/createBulk')
  // createBulk(@Body() girls: CreateGirlDto[]): any {
  createBulk(
    @Body(new ParseArrayPipe({ items: CreateGirlDto })) girls: CreateGirlDto[],
  ): any {
    console.log(girls);
    // return this.girlService.addGirl(body);
  }
  // 此外, ParseArrayPipe 可能需要手动解析查询参数。
  @ApiOperation({ summary: '批量查询' })
  @Get('/findByIds')
  findByIds(
    @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ): any {
    console.log(ids);
    console.log(Array.isArray(ids)); //returns true
    return 'This action returns users by ids';
  }
}
