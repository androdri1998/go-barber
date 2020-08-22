import { Response, Request } from 'express';
import { container } from 'tsyringe';

import AuthenticateuserService from '@modules/users/services/AthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateuserService = container.resolve(AuthenticateuserService);
    const { user, token } = await authenticateuserService.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  }
}
