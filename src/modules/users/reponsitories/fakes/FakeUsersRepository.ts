/* eslint-disable camelcase */
import { uuid } from 'uuidv4';
import User from '@modules/users/infra/typeorm/entities/User';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/reponsitories/IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      email,
      name,
      password,
    });

    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findUserIndex = this.users.findIndex(
      interableUser => interableUser.id === user.id,
    );

    this.users[findUserIndex] = user;
    return user;
  }
}

export default FakeUsersRepository;
