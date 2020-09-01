import { Router } from 'express';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAthenticated';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAthenticated);

providersRouter.get('/', providersController.index);

export default providersRouter;
