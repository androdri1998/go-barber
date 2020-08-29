import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';
import FakeUsersRepository from '../reponsitories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../reponsitories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset password', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    const generateHashPassword = jest.spyOn(fakeHashProvider, 'generateHash');
    const userCreated = await fakeUsersRepository.create(mockUser);

    const { token } = await fakeUserTokensRepository.generate(userCreated.id);

    await resetPasswordService.execute({ password: '123123', token });

    const updatedUser = await fakeUsersRepository.findById(userCreated.id);
    const isUpdatedPassword = await fakeHashProvider.compareHash(
      '123123',
      updatedUser ? updatedUser?.password : '',
    );

    expect(generateHashPassword).toBeCalledWith('123123');
    expect(isUpdatedPassword).toBe(true);
  });

  it('should not be able to reset password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        password: '123123',
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );
    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if passed more than 2 hours', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    const userCreated = await fakeUsersRepository.create(mockUser);
    const { token } = await fakeUserTokensRepository.generate(userCreated.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({ password: '123123', token }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
