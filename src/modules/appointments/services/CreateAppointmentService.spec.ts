import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());

    const mockAppointment = {
      date: new Date(2020, 4, 10, 13),
      provider_id: '123456',
      user_id: 'user',
    };

    const appointment = await createAppointment.execute(mockAppointment);

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(mockAppointment.provider_id);
  });

  it('should not be able to create a new appointment on the same time', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());

    const mockAppointment = {
      date: new Date(2020, 4, 10, 13),
      provider_id: '123456',
      user_id: 'user',
    };

    await createAppointment.execute(mockAppointment);

    await expect(
      createAppointment.execute(mockAppointment),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment on a past date', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());

    const mockAppointment = {
      date: new Date(2020, 4, 10, 11),
      provider_id: 'provider',
      user_id: 'user',
    };

    await expect(
      createAppointment.execute(mockAppointment),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());

    const mockAppointment = {
      date: new Date(2020, 4, 10, 13),
      provider_id: 'provider',
      user_id: 'provider',
    };

    await expect(
      createAppointment.execute(mockAppointment),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8pm and after 5pm', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());

    const mockAppointment1 = {
      date: new Date(2020, 4, 11, 7),
      provider_id: 'provider',
      user_id: 'user',
    };

    const mockAppointment2 = {
      date: new Date(2020, 4, 11, 18),
      provider_id: 'provider',
      user_id: 'user',
    };

    await expect(
      createAppointment.execute(mockAppointment1),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute(mockAppointment2),
    ).rejects.toBeInstanceOf(AppError);
  });
});
