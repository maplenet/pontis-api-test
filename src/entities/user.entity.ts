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
  idLine: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  conections: number;

  @Column()
  expiredAt: Date;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  city: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ default: UserStatus.ACTIVE })
  status: string;

  constructor(
    idLine: number,
    username: string,
    password: string,
    conections: number,
    email: string,
    firstName: string,
    lastName: string,
    city: string,
    expiredAt: Date,
  ) {
    super();
    this.idLine = idLine;
    this.username = username;
    this.password = password;
    this.email = email;
    this.conections = conections;
    this.expiredAt = expiredAt;
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.status = UserStatus.ACTIVE;
  }
}
