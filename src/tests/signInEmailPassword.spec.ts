import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  AuthModule,
  DefaultModelProvider,
  Optional,
  SignInEmailPassword,
  USER_SERVICE,
  UserService
} from 'nestjs-easy-auth';
import { MemoryServer, TestMongooseModule } from 'nestjs-mongo-testing';
import * as request from 'supertest';
import { AuthMongoProviderModule } from '../authMongoProvider/modules/authMongoProvider.module';
import { CredentialsMock } from './credentials/models/app/credentials.mock';
import { jwtConfigMock } from './jwt/models/jwtConfig.mock';
import { mongoConfigMock } from './mongoConfig/mongoConfig.mock';
import { UserMock } from './user/models/app/user.mock';

describe('SignInEmailPassword', () => {
  let app: INestApplication;
  let userService: UserService<UserMock>;

  async function setup(): Promise<void> {
    const rootModule: TestingModule = await Test.createTestingModule({
      imports: [
        TestMongooseModule,
        AuthMongoProviderModule.withConfiguration(mongoConfigMock),
        AuthModule.withConfiguration({
          jwtConfig: jwtConfigMock,
          modelProvider: DefaultModelProvider.withModels({
            credentials: CredentialsMock,
            user: UserMock
          }),
          methods: [SignInEmailPassword.forRoot()]
        })
      ]
    }).compile();
    userService = rootModule.get(USER_SERVICE);

    app = rootModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  }

  async function teardown(): Promise<void> {
    await MemoryServer.getInstance().stop();
    await app.close();
  }

  describe('Success', () => {
    beforeEach(setup);
    afterEach(teardown);

    it('Should create a new user.', async () => {
      const email: string = 'test@test.com';
      const response: request.Response = await request(app.getHttpServer()).post('/auth/signin').send({
        email,
        password: 'testpassword'
      });
      const userId: string = response.body.current_user.id;
      const user: Optional<UserMock> = await userService.getWithId(userId);
      expect(user).toBeDefined();
      expect(user?.email).toBe(email);
      expect(response.status).toBe(201);
    });
  });
});
