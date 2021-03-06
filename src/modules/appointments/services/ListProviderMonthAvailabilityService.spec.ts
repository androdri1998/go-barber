import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 8, 20, 8, 0, 0),
      provider_id: 'provider',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 8, 20, 9, 0, 0),
      provider_id: 'provider',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 8, 20, 10, 0, 0),
      provider_id: 'provider',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 8, 20, 11, 0, 0),
      provider_id: 'provider',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 8, 20, 12, 0, 0),
      provider_id: 'provider',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 8, 20, 13, 0, 0),
      provider_id: 'provider',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 8, 20, 14, 0, 0),
      provider_id: 'provider',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 8, 20, 15, 0, 0),
      provider_id: 'provider',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 8, 20, 16, 0, 0),
      provider_id: 'provider',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 8, 20, 17, 0, 0),
      provider_id: 'provider',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 8, 21, 8, 0, 0),
      provider_id: 'provider',
      user_id: 'user',
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'provider',
      month: 9,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
        { day: 23, available: true },
      ]),
    );
  });
});
