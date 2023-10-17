import { JWTConfig } from 'nestjs-easy-auth';
import { ExtractJwt } from 'passport-jwt';

export const jwtConfigMock: JWTConfig = {
  secret: 'secret',
  accessTokenExpiresIn: '1h',
  refreshTokenExpiresIn: '1d',
  tokenExtraction: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false
};
