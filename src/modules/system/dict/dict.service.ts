import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { Between, FindOptionsWhere, In, Like, Not, Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { PaginatedDto } from '../../../common/dto/paginated.dto';
// import { DICTTYPE_KEY } from './dict.contant';
import {
  ReqAddDictDataDto,
  ReqAddDictTypeDto,
  ReqDictDataListDto,
  ReqDictTypeListDto,
  ReqUpdateDictDataDto,
} from './dto/req-dict.dto';
import { DictData } from './entities/dict_data.entity';
import { DictType } from './entities/dict_type.entity';

@Injectable()
export class DictService {
  constructor(
    @InjectRepository(DictType)
    private readonly dictTypeRepository: Repository<DictType>,
    @InjectRepository(DictData)
    private readonly dictDataRepository: Repository<DictData>,
  ) {}

  /**
   * 新增或者编辑字典类型
   * @param reqAddDictTypeDto
   */
  async addOrUpdateType(reqAddDictTypeDto: ReqAddDictTypeDto) {
    const dictType = await this.findByDictType(
      reqAddDictTypeDto.dictType,
      (reqAddDictTypeDto as DictType).dictId,
    );
    if (dictType) {
      throw new HttpException('该字典类型已存在，请更换', 401);
    }
    await this.dictTypeRepository.save(reqAddDictTypeDto);
  }

  /**
   * 字典类型list
   * @param reqDictTypeListDto
   * @returns
   */
  async typeList(
    reqDictTypeListDto: ReqDictTypeListDto,
  ): Promise<PaginatedDto<DictType>> {
    const where: FindOptionsWhere<DictType> = {};
    if (reqDictTypeListDto.dictName) {
      where.dictName = Like(`%${reqDictTypeListDto.dictName}%`);
    }
    if (reqDictTypeListDto.dictType) {
      where.dictType = Like(`%${reqDictTypeListDto.dictType}%`);
    }
    if (reqDictTypeListDto.status) {
      where.status = reqDictTypeListDto.status;
    }
    if (reqDictTypeListDto.params) {
      where.createTime = Between(
        reqDictTypeListDto.params.beginTime,
        dayjs(reqDictTypeListDto.params.endTime).add(1, 'day').format(),
      );
    }
    const result = await this.dictTypeRepository.findAndCount({
      where,
      order: {
        createTime: 1,
      },
      skip: reqDictTypeListDto.skip,
      take: reqDictTypeListDto.take,
    });
    return {
      rows: result[0],
      total: result[1],
    };
  }

  /**
   * 通过字典类型查询
   * @param dictType 字典类型
   * @param dictId 字典ID
   * @returns
   */
  async findByDictType(dictType: string, dictId?: number): Promise<DictType> {
    const where: FindOptionsWhere<DictType> = {
      dictType,
    };
    if (dictId) {
      where.dictId = Not(dictId);
    }
    return this.dictTypeRepository.findOne({
      where,
    });
  }

  /**
   * 通过字典id数组删除
   * @param [string[]]dictIdArr
   */
  async deleteByDictIdArr(dictIdArr: string[]) {
    const dictTypeList = await this.dictTypeRepository.find({
      where: {
        dictId: In(dictIdArr),
      },
      relations: ['dictDatas'],
    });
    const errorList = dictTypeList.filter((item) => item.dictDatas.length);
    if (errorList.length) {
      const idArr = errorList.map((item) => item.dictId);
      throw new HttpException(
        `字典编号为:${idArr.join('、')}的字典存在字典值，请先删除字典值`,
        401,
      );
    } else {
      await this.dictTypeRepository.delete(dictIdArr);
    }
  }

  /**
   * 通过id查找字典类型
   * @param dictId
   * @returns
   */
  async findDictTypeById(dictId: number) {
    return await this.dictTypeRepository.findOneBy({ dictId });
  }

  /**
   * 通过dictType获取字典数据（排除停用的）
   * TODO: 后续可优化存储在redis
   * @param dictType
   * @returns
   */
  async getDictDataByDictType(dictType: string): Promise<DictData[]> {
    const dictDataArr = await this.dictDataRepository
      .createQueryBuilder('dictData')
      .innerJoin(
        'dictData.dictType',
        'dictType',
        'dictType.status = 0 and dictType.dictType = :dictType',
        { dictType },
      )
      .where('dictType.status = 0')
      .getMany();
    return dictDataArr;
  }

  /**
   * 分页查询字典
   * @param reqDictDataListDto
   * @returns
   */
  async dictDataList(
    reqDictDataListDto: ReqDictDataListDto,
  ): Promise<PaginatedDto<DictData>> {
    const where: FindOptionsWhere<DictData> = {};
    if (reqDictDataListDto.status) {
      where.status = reqDictDataListDto.status;
    }
    if (reqDictDataListDto.dictLabel) {
      where.dictLabel = Like(`%${reqDictDataListDto.dictLabel}%`);
    }
    const result = await this.dictDataRepository
      .createQueryBuilder('dictData')
      .innerJoin(
        'dictData.dictType',
        'dictType',
        'dictType.dictType = :dictType',
        { dictType: reqDictDataListDto.dictType },
      )
      .where(where)
      .orderBy('dictData.dictSort', 'ASC')
      .addOrderBy('dictData.createTime', 'ASC')
      .skip(reqDictDataListDto.skip)
      .take(reqDictDataListDto.take)
      .getManyAndCount();
    return { rows: result[0], total: result[1] };
  }
}
