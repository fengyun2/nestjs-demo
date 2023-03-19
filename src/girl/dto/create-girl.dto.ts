import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateGirlDto {
  @ApiProperty({ description: '姓名' })
  readonly name: string;

  @ApiProperty({ description: '年龄' })
  readonly age: number;

  @ApiPropertyOptional({ description: '技能' })
  readonly skill: string;
}
