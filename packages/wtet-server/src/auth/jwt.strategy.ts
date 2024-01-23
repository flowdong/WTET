import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constats';
import { CacheService } from '../cache/cache.service';

@Injectable() // 实现了 PassportStrategy 接口 把jwtStrategy 作为参数传递
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private cacheService: CacheService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  // JWT验证 - Step 4: 被守卫调用
  async validate(req: any, payload: any, done: Function) {
    const originToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    // 只有验证通过之后才会来到这里
    // console.log(`JWT验证 - Step 4: 被守卫调用`);
    const cacheToken = await this.cacheService.get(
      `user-token-${payload.sub}-${payload.username}`,
    );

    //单点登陆验证
    if (cacheToken !== JSON.stringify(originToken)) {
      throw new UnauthorizedException('您账户已经在另一处登陆，请重新登陆');
    }
    return done(null, {
      userId: payload.sub,
      username: payload.username,
      realName: payload.realName,
      role: payload.role,
    });
  }
}
