import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import uploadConfig from '@config/upload';
import { CreateCarController } from '../modules/cars/useCases/CreateCar/CreateCarController';
import { ensureAuth } from '../middlewares/ensureAuth';
import { UploadCarImageController } from '../modules/cars/useCases/UploadCarImage/UploadCarImageController';
import { ListAvailableCarsController } from '../modules/cars/useCases/ListAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '../modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController';
//import { CreateSpecificationController } from '../modules/cars/useCases/CreateSpecification/CreateSpecificationController';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const carsRoutes = Router();

const createCarController = container.resolve(CreateCarController);
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImageController();

const uploadCarImage = multer(uploadConfig);

carsRoutes.get('/available', listAvailableCarsController.handle);

//carsRoutes.use(ensureAuth);

carsRoutes.post('/', ensureAuth, ensureAdmin, createCarController.handle);
carsRoutes.post('/specifications/:id', ensureAuth, ensureAdmin, createCarSpecificationsController.handle);
carsRoutes.post(
  '/images/:id',
  ensureAuth,
  ensureAdmin,
  uploadCarImage.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };