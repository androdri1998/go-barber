import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAthenticated';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAthenticated);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentController.create,
);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
