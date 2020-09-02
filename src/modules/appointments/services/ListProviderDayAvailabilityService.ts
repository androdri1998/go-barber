/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';
import { getHours } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IListProviderDayAvailabilityService from '../dtos/IListProviderDayAvailabilityService';

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IListProviderDayAvailabilityService): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHours = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      return {
        hour,
        available: !hasAppointmentInHours,
      };
    });

    return availability;
  }
}
