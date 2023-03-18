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
  getGirlById(id: number): any {
    let reJson: any = {};
    switch (id) {
      case 1:
        reJson = { id: 1, name: '翠花', age: 18 };
        break;
      case 2:
        reJson = { id: 2, name: '小红', age: 20 };
        break;
      case 3:
        reJson = { id: 3, name: '大丫', age: 23 };
        break;
    }
    return reJson;
  }
}
