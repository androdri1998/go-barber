import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAthenticated from '../middlewares/ensureAthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAthenticated);

appointmentsRouter.post('/', async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return res.json({ ...appointment });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return res.json(appointments);
});

export default appointmentsRouter;
