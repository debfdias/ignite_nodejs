import { Router } from 'express';
import multer from 'multer';

import { ensureAuth } from '../middlewares/ensureAuth';
import uploadConfig from '../config/upload';

import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch('/avatar',ensureAuth,uploadAvatar.single('avatar'),updateUserAvatarController.handle,);

export { usersRoutes };