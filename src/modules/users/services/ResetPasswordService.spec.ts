import 'reflect-metadata';

// import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';
import FakeUsersRepository from '../reponsitories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../reponsitories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });

  it('should be able to reset password', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    const userCreated = await fakeUsersRepository.create(mockUser);

    const { token } = await fakeUserTokensRepository.generate(userCreated.id);

    await resetPasswordService.execute({ password: '123123', token });

    const updatedUser = await fakeUsersRepository.findById(userCreated.id);

    expect(updatedUser?.password).toBe('123123');
  });
});
