import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppConfig from './config/common';
import DatabaseConfig from './config/database';
import RedisConfig from './config/redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './res/user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guard/auth.guard';
import { Job } from './job/job';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from './cache/cache.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV == 'production'
          ? '.env.production'
          : '.env.development',
      load: [AppConfig, DatabaseConfig, RedisConfig],
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
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    CacheModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    //  Job,
  ],
})
export class AppModule {}
