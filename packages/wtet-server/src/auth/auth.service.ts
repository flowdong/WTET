import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { comparePassword } from '../utils/bcrypt';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async loginSingToken(loginParams) {
    const authResult = await this.validateUser(
      loginParams.username,
      loginParams.password,
    );
    switch (authResult.code) {
      case 1:
        return this.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(
    username: string,
    password: string,
  ): Promise<{ code: number; user: User | null }> {
    // console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.userService.findOne(username);

    if (user) {
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const isOk = comparePassword(password, user.password);
      if (isOk) {
        // 密码正确
        return {
          code: 1,
          user,
        };
      } else {
        // 密码错误
        return {
          code: 2,
          user: null,
        };
      }
    }
    // 查无此人
    return {
      code: 401,
      user: null,
    };
  }

  async certificate(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      return {
        code: 200,
        data: {
          token,
        },
        msg: `登录成功`,
      };
    } catch (error) {
      return {
        code: 600,
        msg: `账号或密码错误`,
      };
    }
  }
}
