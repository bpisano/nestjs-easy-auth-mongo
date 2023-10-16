import { DynamicModule, Module } from '@nestjs/common';
import { MongoConfig } from '../../mongoConfig/models/types/mongoConfig';
import { MongoCredentialsStorageModule } from '../../mongoCredentialsStorage/modules/mongoCredentialsStorage.module';
import { MongoUserStorageModule } from '../../mongoUserStorage/modules/mongoUserStorage.module';

@Module({})
export class MongoAuthModule {
  public static withConfiguration(config: MongoConfig): DynamicModule {
    return {
      module: MongoAuthModule,
      imports: [
        MongoCredentialsStorageModule.withConfiguration(config),
        MongoUserStorageModule.withConfiguration(config)
      ],
      providers: [],
      exports: []
    };
  }
}
