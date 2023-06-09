import { HttpException, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Girl } from './entities/girl.entity';

@Injectable()
export class GirlService {
  // 在构造函数里增加一个依赖注入的操作
  constructor(
    @InjectRepository(Girl) private readonly girl: Repository<Girl>,
  ) {}
  getGirls(): Promise<Girl[]> {
    // return {
    //   code: 0,
    //   data: ['翠花', '小红', '大丫'],
    //   msg: '请求女孩列表成功2',
    // };
    return this.girl.find();
  }
  // 新增一个女孩
  async addGirl(girl: Partial<Girl>): Promise<Girl> {
    // const data = new Girl();
    // data.name = '晓彤';
    // data.age = 16;
    // data.skill = '撒娇卖萌，么么哒';
    // return this.girl.save(data);

    const { name } = girl;
    if (!name) {
      throw new HttpException('缺少名称', 401);
    }
    const existGirl = await this.girl.findOne({ where: { name } });
    if (existGirl) {
      throw new HttpException(`${name} 女孩已存在`, 401);
    }
    return this.girl.save(girl);
  }
  getGirlById(id: number): Promise<Girl> {
    return this.girl.findOne({ where: { id } });
    // let reJson: any = {};
    // switch (id) {
    //   case 1:
    //     reJson = { id: 1, name: '翠花', age: 18 };
    //     break;
    //   case 2:
    //     reJson = { id: 2, name: '小红', age: 20 };
    //     break;
    //   case 3:
    //     reJson = { id: 3, name: '大丫', age: 23 };
    //     break;
    // }
    // return reJson;
  }
  // 删除一个女孩
  async delGirl(id: number): Promise<Girl> {
    const existGirl = await this.girl.findOne({ where: { id } });
    if (!existGirl) {
      throw new HttpException(`id为${id}的女孩不存在`, 401);
    }
    return this.girl.remove(existGirl);
    // return this.girl.delete(id);
  }
  // 修改一个女孩
  async updateGirl(id: number, body: Partial<Girl>): Promise<Girl> {
    const existGirl = await this.girl.findOne({ where: { id } });
    if (!existGirl) {
      throw new HttpException(`id为${id}的女孩不存在`, 401);
    }
    // const data = new Girl();
    // data.name = '王小丫';
    // data.age = 18;
    const updateGirl = this.girl.merge(existGirl, body);
    return this.girl.save(updateGirl);
  }
  // 根据项目查找一个女孩的信息
  getGirlByName(name: string): Promise<Girl[]> {
    return this.girl.find({
      where: {
        name: Like(`%${name}%`),
      },
    });
  }
}
