import { Router } from 'express';
import { 
    furnitureController, 
    userController 
} from './controllers/index.js';

const routes = Router();

routes.get('/data/catalog', furnitureController.getAll);

// User routes
routes.post('/users/register', userController.register);
routes.get('/users/logout', userController.logout);

export default routes;