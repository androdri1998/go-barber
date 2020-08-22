import { Router } from 'express';

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentsController';

import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAthenticated';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.use(ensureAthenticated);

appointmentsRouter.post('/', appointmentController.create);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find();
//   return res.json(appointments);
// });

export default appointmentsRouter;
