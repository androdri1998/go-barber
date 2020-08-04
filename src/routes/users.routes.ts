import { Router, Request, Response } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAthenticated from '../middlewares/ensureAthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({
    name,
    email,
    password,
  });

  delete user.password;
  return res.json(user);
});

usersRouter.patch(
  '/avatar',
  [ensureAthenticated, upload.single('avatar')],
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { filename } = req.file;

    const updateUserAvatarService = new UpdateUserAvatarService();
    const user = await updateUserAvatarService.execute({
      userId,
      avatarFilename: filename,
    });

    delete user.password;

    return res.json(user);
  },
);

export default usersRouter;
