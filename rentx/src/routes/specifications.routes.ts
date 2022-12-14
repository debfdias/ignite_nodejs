import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuth } from '../middlewares/ensureAuth';

import { CreateSpecificationController } from '../modules/cars/useCases/CreateSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuth);

specificationsRoutes.post('/', ensureAuth, ensureAdmin, createSpecificationController.handle);

export { specificationsRoutes };
