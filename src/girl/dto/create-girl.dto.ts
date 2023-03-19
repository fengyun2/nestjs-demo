import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateGirlDto {
  @ApiProperty({ description: '姓名' })
  @IsNotEmpty({ message: '姓名必填' })
  readonly name: string;

  @ApiProperty({ description: '年龄' })
  @IsNumber()
  readonly age: number;

  @ApiPropertyOptional({ description: '技能' })
  readonly skill: string;
}
