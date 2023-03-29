/**
 * 获取请求头信息中的用户信息
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export enum UserEnum {
  'userId' = 'userId',
  // 'userName' = 'userName',
  'userName' = 'username',
  'nickName' = 'nickName',
  'deptId' = 'deptId',
  'deptName' = 'deptName',
}

// 设置在参数中，获取哪些用户信息
export const User = createParamDecorator(
  (data: UserEnum, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    // 根据属性取相应值
    const keyValue = data ? user && user[data || UserEnum.userId] : user;
    return keyValue;
  },
);
