/* eslint-disable import/first */
import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../reponsitories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const mockUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    };

    const createdUser = await createUser.execute(mockUser);
    const response = await authenticateUser.execute({
      email: mockUser.email,
      password: mockUser.password,
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(createdUser);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const mockUser = {
      email: 'johndoe@example.com',
      password: '12345',
    };

    expect(
      authenticateUser.execute({
        email: mockUser.email,
        password: mockUser.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
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

    expect(
      authenticateUser.execute({
        email: mockUser.email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
