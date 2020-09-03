/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProvidersDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { month, year, day } = req.body;
    const { provider_id } = req.params;

    const istProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await istProviderDayAvailability.execute({
      month: Number(month),
      provider_id,
      year: Number(year),
      day: Number(day),
    });

    return res.json(availability);
  }
}
