import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { PaginationPipe } from '../../../common/pipes/pagination.pipe';
import { UserInfoPipe } from 'src/common/pipes/user-info.pipe';
import { DictService } from './dict.service';
import {
  ReqAddDictDataDto,
  ReqAddDictTypeDto,
  ReqDictDataListDto,
  ReqDictTypeListDto,
  ReqUpdateDictDataDto,
} from './dto/req-dict.dto';
import { DictData } from './entities/dict_data.entity';
import { DictType } from './entities/dict_type.entity';

@ApiTags('字典管理')
@Controller('dict')
export class DictController {
  constructor(private readonly dictService: DictService) {}

  /**
   * 新增字典类型
   */
  @Post('/type')
  async addType(
    @Body() reqAddDictTypeDto: ReqAddDictTypeDto,
    @User(UserEnum.userName) userName: string,
  ) {
    reqAddDictTypeDto.createBy = reqAddDictTypeDto.updateBy = userName;
    console.warn(reqAddDictTypeDto, userName, 'reqAddDictTypeDto ====>');
    await this.dictService.addOrUpdateType(reqAddDictTypeDto);
  }
  @Get('/type/list')
  async typeList(
    @Query(PaginationPipe) reqDictTypeListDto: ReqDictTypeListDto,
  ): Promise<PaginatedDto<DictType>> {
    return this.dictService.typeList(reqDictTypeListDto);
  }
}
