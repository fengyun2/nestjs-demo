import { Injectable } from '@nestjs/common';

@Injectable()
export class GirlService {
  getGirls(): any {
    return {
      code: 0,
      data: ['翠花', '小红', '大丫'],
      msg: '请求女孩列表成功2',
    };
  }
  addGirl() {
    return {
      code: 200,
      data: { id: 1, name: '晓彤', age: 16 },
      msg: '女孩添加成功',
    };
  }
}
