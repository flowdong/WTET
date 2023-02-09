import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppConfig from './config/common';
import DatabaseConfig from './config/database';
import { TypeOrmModule } from '@nestjs/typeorm';




@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV=='production' ?'.env.production':'.env.development',
      load: [AppConfig, DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        //console.log(DatabaseConfig());
        return {
          type: 'mysql',
          host: configService.get('database.host'), // 和nestjs中的概念结合起来
          port: Number(DatabaseConfig().port), // 单纯的使用函数式写法也ok
          username: DatabaseConfig().username,
          password: DatabaseConfig().password,
          database: DatabaseConfig().database,
          entities: [__dirname + '/**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
