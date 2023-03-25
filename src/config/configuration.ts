// 配置文件

import { Logger } from '@nestjs/common';

// 配置文件接口
export interface IConfig {
  /**
   * 数据库配置
   */
  database?: {
    type?: string; // 数据库类型
    host?: string; // 数据库的连接地址host
    port?: number | string; // 数据库的端口(mysql默认为 3306)
    username?: string; // 连接账号
    password?: string; // 连接密码
    database?: string; // 连接的表名
    retryDelay?: number; // 重试连接数据库间隔
    retryAttempts?: number; // 允许重连次数
    autoLoadModels: boolean; // 如果为true，模型将自动载入，无需在配置处重复写实体（默认:false)
    synchronize?: boolean; //如果为true，自动载入的模型将被同步进数据库，生成环境要关闭，否则肯呢个因为字段的删除而造成数据的丢失。
    autoLoadEntities?: boolean; // 自动加载实体配置，forFeature() 注册的每个实体都自动加载
    logging?: any; // 是否启动日志记录
  };
  /**
   * redis 配置
   */
  redis?: {
    config: {
      url: string;
    };
  };
}

// 判断系统是否是开发环境
export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

// 根据环境变量使用配置
export default async () => {
  let envConfig: IConfig = {};
  try {
    envConfig = (await import(`./config.${process.env.NODE_ENV}`)).default;
  } catch (error) {
    const logger = new Logger('ConfigModule');
    logger.error(error);
  }
  // 返回环境配置
  return envConfig;
};
