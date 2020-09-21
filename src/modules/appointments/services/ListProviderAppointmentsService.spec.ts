import 'reflect-metadata';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments on a specific day ', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 8, 20, 8, 0, 0),
      provider_id: 'provider',
      user_id: 'user',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 8, 20, 9, 0, 0),
      provider_id: 'provider',
      user_id: 'user',
    });

    const availability = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      month: 9,
      year: 2020,
      day: 20,
    });

    expect(availability).toEqual([appointment1, appointment2]);
  });
});
