import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { filename } = req.file;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatarService.execute({
      userId,
      avatarFilename: filename,
    });

    return res.json(classToClass(user));
  }
}
