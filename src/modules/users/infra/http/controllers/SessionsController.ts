import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateuserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateuserService = container.resolve(AuthenticateuserService);
    const { user, token } = await authenticateuserService.execute({
      email,
      password,
    });

    return res.json({ user: classToClass(user), token });
  }
}
