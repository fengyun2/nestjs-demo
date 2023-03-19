import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Girl } from './entities/girl.entity';

@Injectable()
export class GirlService {
  // 在构造函数里增加一个依赖注入的操作
  constructor(
    @InjectRepository(Girl) private readonly girl: Repository<Girl>,
  ) {}
  getGirls(): any {
    // return {
    //   code: 0,
    //   data: ['翠花', '小红', '大丫'],
    //   msg: '请求女孩列表成功2',
    // };
    return this.girl.find();
  }
  // 新增一个女孩
  addGirl() {
    // return {
    //   code: 200,
    //   data: { id: 1, name: '晓彤', age: 16 },
    //   msg: '女孩添加成功',
    // };
    const data = new Girl();
    data.name = '晓彤';
    data.age = 16;
    data.skill = '撒娇卖萌，么么哒';
    return this.girl.save(data);
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
  // 删除一个女孩
  delGirl(id: number) {
    return this.girl.delete(id);
  }
  // 修改一个女孩
  updateGirl(id: number) {
    const data = new Girl();
    data.name = '王小丫';
    data.age = 18;
    return this.girl.update(id, data);
  }
  // 根据项目查找一个女孩的信息
  getGirlByName(name: string) {
    return this.girl.find({
      where: {
        name: Like(`%${name}%`),
      },
    });
  }
}
