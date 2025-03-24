import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserStatus } from "../constants/user";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  idLine: number = 0;

  @Column()
  username: string = "";

  @Column()
  password: string = "";

  @Column()
  conections: number = 0;

  @Column()
  expiredAt: Date = new Date();

  @Column()
  email: string = "";

  @Column()
  firstName: string = "";

  @Column()
  lastName: string = "";

  @Column()
  city: string = "";

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ default: UserStatus.ACTIVE })
  status: string = UserStatus.ACTIVE;
}
