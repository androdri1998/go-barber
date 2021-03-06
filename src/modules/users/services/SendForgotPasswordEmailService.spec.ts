import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '../reponsitories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../reponsitories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const mockUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    await fakeUsersRepository.create(mockUser);

    await sendForgotPasswordEmailService.execute({ email: mockUser.email });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    const mockUser = {
      email: 'johndoe@example.com',
    };

    await expect(
      sendForgotPasswordEmailService.execute({ email: mockUser.email }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const sendToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const mockUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    const userCreated = await fakeUsersRepository.create(mockUser);

    await sendForgotPasswordEmailService.execute({ email: mockUser.email });

    await expect(sendToken).toBeCalledWith(userCreated.id);
  });
});
