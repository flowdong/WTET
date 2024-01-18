import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不允许为空' })
  username: string;

  @IsNotEmpty({ message: '密码不允许为空' })
  password: string;

  @IsNotEmpty({ message: '更新创建时间必选' })
  @IsNumber()
  update_time: number;

  @IsNotEmpty({ message: '创建时间必选' })
  create_time: number;

  @IsNotEmpty({ message: '状态必填' })
  state: number;
}
