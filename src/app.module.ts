import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { EventCategoryModule } from './event_category/event_category.module';
import { HallManagementModule } from './hall_management/hall_management.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Makes the ConfigModule globally available
  }), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    inject: [ConfigService],
  }), AuthModule, RoleModule, PermissionModule, EventCategoryModule, HallManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
