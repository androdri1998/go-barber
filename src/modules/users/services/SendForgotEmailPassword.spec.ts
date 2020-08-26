import 'reflect-metadata';

// import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotEmailPassword from './SendForgotEmailPassword';
import FakeUsersRepository from '../reponsitories/fakes/FakeUsersRepository';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendForgotEmailPassword = new SendForgotEmailPassword(
      fakeUsersRepository,
      fakeMailProvider,
    );
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const mockUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    await fakeUsersRepository.create(mockUser);

    await sendForgotEmailPassword.execute({ email: mockUser.email });

    expect(sendMail).toHaveBeenCalled();
  });
});
