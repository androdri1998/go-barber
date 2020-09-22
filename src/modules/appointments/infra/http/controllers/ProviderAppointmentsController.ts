/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const providerId = req.user.id;
    const { day, month, year } = req.query;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      provider_id: providerId,
    });

    return res.json(classToClass(appointments));
  }
}
