import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DataBaseConfig } from './auth/config';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${DataBaseConfig.dbHost}:${DataBaseConfig.dbPort}/${DataBaseConfig.dbName}`, {
      user: DataBaseConfig.dbUserName,
      pass: DataBaseConfig.dbPass,
    }),
    AuthModule,
  ],
})
export class AppModule {
}
