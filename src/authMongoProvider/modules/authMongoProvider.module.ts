import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongoConfig } from '../../mongoConfig/models/types/mongoConfig';
import { MongoCredentialsStorageModule } from '../../mongoCredentialsStorage/modules/mongoCredentialsStorage.module';
import { MongoUserStorageModule } from '../../mongoUserStorage/modules/mongoUserStorage.module';

@Global()
@Module({})
export class AuthMongoProviderModule {
  public static withConfiguration(config: MongoConfig): DynamicModule {
    return {
      module: AuthMongoProviderModule,
      imports: [
        MongoCredentialsStorageModule.withConfiguration(config),
        MongoUserStorageModule.withConfiguration(config)
      ],
      providers: [],
      exports: [MongoCredentialsStorageModule, MongoUserStorageModule]
    };
  }
}
