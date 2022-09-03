import { Router } from 'express';

import { SendResetPassEmailController } from '../modules/accounts/useCases/sendResetPasswordEmail/SendResetPassEmailController';
import { ResetPasswordController } from '../modules/accounts/useCases/resetPassword/ResetPasswordController';

const passwordRoutes = Router();

const sendResetPassController = new SendResetPassEmailController();
const resetPassController = new ResetPasswordController();

passwordRoutes.post('/forgot', sendResetPassController.handle);
passwordRoutes.post('/reset', resetPassController.handle);

export { passwordRoutes };