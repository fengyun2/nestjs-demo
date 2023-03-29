/**
 * 通过userId 获取用户其他信息的管道
 */

import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { UserEnum } from '../decorators/user.decorator';

@Injectable()
export class UserInfoPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { data } = metadata;
    if (!data) return value;
    if (data === UserEnum.userId) return value;
    if (data === UserEnum.userName) return value;
    if (data === UserEnum.nickName) return value;
    if (data === UserEnum.deptId) return value;
    if (data === UserEnum.deptName) return value;
  }
}
