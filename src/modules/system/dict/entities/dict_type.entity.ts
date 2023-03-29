import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { DictData } from './dict_data.entity';

@Entity({
  name: 'dict_type',
})
export class DictType extends BaseEntity {
  // 字典编码
  @PrimaryGeneratedColumn({ name: 'dict_id', comment: '字典类型ID' })
  @Type()
  @IsNumber()
  dictId: number;

  // 字典名称
  @Column({ name: 'dict_name', comment: '字典名称', default: '', length: 100 })
  @IsString()
  dictName: string;

  // 字典类型
  @Column({
    name: 'dict_type',
    comment: '字典类型',
    default: '',
    length: 100,
    unique: true,
  })
  @IsString()
  dictType: string;

  // 状态(0正常 1停用)
  @Column({
    name: 'status',
    type: 'char',
    default: '0',
    length: 1,
    comment: '状态(0正常 1停用)',
  })
  @IsString()
  status: string;

  // 字典数据
  @OneToMany(() => DictData, (dictData) => dictData.dictType)
  @ApiHideProperty()
  dictDatas: DictData[];
}
