/* eslint-disable import/first */
import 'reflect-metadata';
import 'dotenv/config';

import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../reponsitories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    };

    const createdUser = await fakeUsersRepository.create(mockUser);
    const response = await authenticateUser.execute({
      email: mockUser.email,
      password: mockUser.password,
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(createdUser);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const mockUser = {
      email: 'johndoe@example.com',
      password: '12345',
    };

    await expect(
      authenticateUser.execute({
        email: mockUser.email,
        password: mockUser.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    };

    await fakeUsersRepository.create(mockUser);

    await expect(
      authenticateUser.execute({
        email: mockUser.email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
