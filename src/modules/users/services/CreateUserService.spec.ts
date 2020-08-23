import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../reponsitories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const mockUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    };

    const user = await createUser.execute(mockUser);

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const mockUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    };

    await createUser.execute(mockUser);

    expect(createUser.execute(mockUser)).rejects.toBeInstanceOf(AppError);
  });
});
