import { Router } from 'express';

import AuthenticateuserService from '../../../../modules/users/services/AthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateuserService = new AuthenticateuserService();
  const { user, token } = await authenticateuserService.execute({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
