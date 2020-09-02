import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 8, 21, 8, 0, 0),
      provider_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 8, 21, 10, 0, 0),
      provider_id: 'user',
    });

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      month: 9,
      year: 2020,
      day: 21,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
      ]),
    );
  });
});
