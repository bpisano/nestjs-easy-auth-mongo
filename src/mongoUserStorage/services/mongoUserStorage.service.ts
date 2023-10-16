import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOne, DeleteMany, FindOne, MongoDB, MongoDBQuery, UpdateOne } from 'monkey-db';
import { AnyUserRepresentation, DatabaseModelOf, PromiseOptional, UserStorage } from 'nestjs-easy-auth';
import { MONGO_DB, MONGO_USER_MODEL } from '../../mongoConfig/modules/mongoConfig.moduleKeys';

@Injectable()
export class MongoUserStorage<User extends AnyUserRepresentation> implements UserStorage<User> {
  public constructor(
    @InjectModel(MONGO_USER_MODEL)
    private readonly model: Model<DatabaseModelOf<User>>,
    @Inject(MONGO_DB) private readonly db: MongoDB
  ) {}

  public async getWith(params: any): PromiseOptional<DatabaseModelOf<User>> {
    return this.db.perform(MongoDBQuery.withModel(this.model).modifier(FindOne.where(params)));
  }

  public async create(user: Partial<DatabaseModelOf<User>>): Promise<DatabaseModelOf<User>> {
    return this.db.perform(MongoDBQuery.withModel(this.model).modifier(CreateOne.withData(user)));
  }

  public async updateWith(params: any, user: Partial<DatabaseModelOf<User>>): Promise<DatabaseModelOf<User>> {
    return this.db.perform(MongoDBQuery.withModel(this.model).modifier(UpdateOne.where(params, user)));
  }

  public async deleteWith(params: any): Promise<void> {
    await this.db.perform(MongoDBQuery.withModel(this.model).modifier(DeleteMany.where(params)));
  }
}
