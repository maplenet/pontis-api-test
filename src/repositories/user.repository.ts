import { DeepPartial, Not } from "typeorm";
import { UserDto } from "../dto/user.dto";
import { User } from "../entities/user.entity";
import { UserStatus } from "../constants/user";

export const createUser = async (user: UserDto) => {
  const newUser = {
    idLine: user.idLine,
    email: user.email,
    username: user.username,
    password: user.password,
    conections: user.conections,
    expiredAt: user.expiredAt,
    firstName: user.firstName,
    lastName: user.lastName,
    city: user.city,
  };

  return await User.create(newUser as DeepPartial<User>).save();
};

export const getUser = async (username: string) => {
  return await User.findOne({
    where: { username: username, status: Not(UserStatus.DELETED) },
  });
};

export const getUserById = async (id: number) => {
  return await User.findOne({
    where: { id: id, status: Not(UserStatus.DELETED) },
  });
};

export const deleteUser = async (username: string) => {
  return await User.update(
    { username: username, status: Not(UserStatus.DELETED) },
    { status: UserStatus.DELETED }
  );
};

export const updateUser = async (username: string, user: Partial<UserDto>) => {
  return await User.update(
    { username: username, status: Not(UserStatus.DELETED) },
    user
  );
};
