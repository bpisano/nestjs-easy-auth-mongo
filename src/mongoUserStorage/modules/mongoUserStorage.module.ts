import { DynamicModule, Module } from '@nestjs/common';
import { USER_STORAGE } from 'nestjs-easy-auth';
import { MongoConfig } from '../../mongoConfig/models/types/mongoConfig';
import { MongoConfigModule } from '../../mongoConfig/modules/mongoConfig.module';
import { MongoUserStorage } from '../services/mongoUserStorage.service';

@Module({})
export class MongoUserStorageModule {
  public static withConfiguration(config: MongoConfig): DynamicModule {
    return {
      module: MongoUserStorageModule,
      imports: [MongoConfigModule.withConfiguration(config)],
      providers: [{ provide: USER_STORAGE, useClass: MongoUserStorage }],
      exports: [USER_STORAGE]
    };
  }
}
