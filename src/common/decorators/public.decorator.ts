import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../constants/decorator.contant';

// 设置不进行 jwt 校验
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
