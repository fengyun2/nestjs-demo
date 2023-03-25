// 测试环境配置文件
import { defineConfig } from './defineConfig';

export default defineConfig({
  // typeorm 配置
  database: {
    type: 'mysql', // 数据库类型
    host: process.env.MYSQL_HOST || 'localhost', // 数据库的连接地址host
    port: process.env.MYSQL_PORT || 3306, // 数据库的端口 3306
    username: process.env.MYSQL_USERNAME || 'root', // 连接账号
    password: process.env.MYSQL_PASSWORD || 'root123', // 连接密码
    database: process.env.MYSQL_DATABASE || 'nest_demo', // 连接的表名
    retryDelay: 500, // 重试连接数据库间隔
    retryAttempts: 10, // 允许重连次数
    synchronize: true, // 是否将实体同步到数据库
    autoLoadModels: true,
    autoLoadEntities: true, // 自动加载实体配置，forFeature() 注册的每个实体都自动加载
    logging: false, // 是否启动日志记录
  },
});
