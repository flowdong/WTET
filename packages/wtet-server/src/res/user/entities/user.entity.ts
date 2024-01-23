import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { encryptPassword } from '../../../utils/bcrypt';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 100 })
  username: string; // 用户名

  @Column({ length: 100 })
  nickname: string; //昵称

  @Column()
  password: string; // 密码

  @Column({
    nullable: true,
    default: () => null,
  })
  avatar?: string; //头像

  @Column({
    nullable: true,
    default: () => null,
  })
  email: string;

  @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
  role: string; // 用户角色

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeInsert()
  async encryptPwd() {
    this.password = encryptPassword(this.password);
  }
}
