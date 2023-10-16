import { DynamicModule, Module } from '@nestjs/common';
import { CREDENTIALS_STORAGE } from 'nestjs-easy-auth';
import { MongoConfig } from '../../mongoConfig/models/types/mongoConfig';
import { MongoConfigModule } from '../../mongoConfig/modules/mongoConfig.module';
import { MongoCredentialsStorage } from '../services/mongoCredentialsStorage.service';

@Module({})
export class MongoCredentialsStorageModule {
  public static withConfiguration(config: MongoConfig): DynamicModule {
    return {
      module: MongoCredentialsStorageModule,
      imports: [MongoConfigModule.withConfiguration(config)],
      providers: [{ provide: CREDENTIALS_STORAGE, useClass: MongoCredentialsStorage }],
      exports: [CREDENTIALS_STORAGE]
    };
  }
}
