# NestJS Easy Auth Mongo

This package is a storage provider for the [NestJS Easy Auth package](https://github.com/bpisano/nestjs-easy-auth).

# Installation

You can install the package using the following commands:

```bash
$ yarn
yarn add nestjs-easy-auth-mongo

$ npm
npm install nestjs-easy-auth-mongo
```

# Usage

Import the `AuthMongoProviderModule` before importing the `AuthModule` in your `AppModule`:

```typescript
import { AuthMongoModule } from 'nestjs-easy-auth-mongo';

@Module({
  imports: [
    AuthMongoProviderModule.withConfiguration({
      dbName: 'my-database-name',
      uri: 'mongodb://user:password@127.0.0.1:27017',
      schemas: {
        credentials: DBCredentialsSchema,
        user: DBUserSchema
      }
    }),
    AuthModule.withConfiguration({
      // Your auth configuration.
      // For complete documentation, see https://github.com/bpisano/nestjs-easy-auth
    })
  ]
})
export class AppModule {}
```

With this configuration, the NestJS Easy Auth package will use MongoDB as its storage provider.
It will use the provided schemas to store the credentials and the users in the database.

<details>
<summary><strong>Credentials schema example</strong></summary>

```typescript
@Schema({
  collection: 'credentials'
})
export class DBCredentials {
  @Prop()
  public readonly userId: string;

  @Prop()
  public readonly authType: string;

  @Prop()
  public readonly accessToken: string;

  @Prop()
  public readonly refreshToken: string;

  @Prop()
  public readonly accessTokenExpiration: Date;

  @Prop()
  public readonly refreshTokenExpiration: Date;

  public toAppModel: () => Credentials;
}

export type DBCredentialsDocument = HydratedDocument<DBCredentials>;
export const DBCredentialsSchema: MongooseSchema<DBCredentialsDocument> = SchemaFactory.createForClass(DBCredentials);

// This is the method that will be used to convert the database model to the app model.
// For full documentation, see https://github.com/bpisano/nestjs-easy-auth
DBCredentialsSchema.methods.toAppModel = function (): Credentials {
  return new Credentials(
    this.userId,
    this.authType,
    this.accessToken,
    this.refreshToken,
    this.accessTokenExpiration,
    this.refreshTokenExpiration
  );
};
```

</details>

<details>
<summary><strong>User schema example</strong></summary>

```typescript
@Schema({ collection: 'users' })
export class DBUser {
  @Prop()
  public readonly email: string;

  @Prop()
  public readonly hashedPassword?: string;

  public toAppModel: () => User;
}

export type DBUserDocument = HydratedDocument<DBUser>;
export const DBUserSchema: MongooseSchema<DBUserDocument> = SchemaFactory.createForClass(DBUser);

// This is the method that will be used to convert the database model to the app model.
// For full documentation, see https://github.com/bpisano/nestjs-easy-auth
DBUserSchema.methods.toAppModel = function (): User {
  return new User(this._id, this.email, this.hashedPassword);
};
```

</details>

When creating your app models, use the `Document` classes as the database models:

```typsecript
export class Credentials implements CredentialsRepresentation<DBCredentialsDocument, PublicCredentials> {
  // ...
}
```

```typsecript
export class User implements UserRepresentation<DBUserDocument, PublicUser> {
  // ...
}
```
