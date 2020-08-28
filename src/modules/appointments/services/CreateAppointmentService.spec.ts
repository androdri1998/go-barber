import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const mockAppointment = {
      date: new Date(2020, 10, 10, 11),
      provider_id: '123456',
    };

    const appointment = await createAppointment.execute(mockAppointment);

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(mockAppointment.provider_id);
  });

  it('should not be able to create a new appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const mockAppointment = {
      date: new Date(),
      provider_id: '123456',
    };

    await createAppointment.execute(mockAppointment);

    await expect(
      createAppointment.execute(mockAppointment),
    ).rejects.toBeInstanceOf(AppError);
  });
});
