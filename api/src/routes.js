import { Router } from 'express';
import { 
    furnitureController, 
    userController 
} from './controllers/index.js';
import { isAuth } from './middlewares/authMiddleware.js';

const routes = Router();

routes.get('/data/catalog', furnitureController.getAll);
routes.post('/data/catalog', isAuth, furnitureController.create);
routes.get('/data/catalog/:furnitureId', furnitureController.getById);
routes.delete('/data/catalog/:furnitureId', isAuth, furnitureController.remove);
routes.put('/data/catalog/:furnitureId', isAuth, furnitureController.update);
// User routes
routes.post('/users/register', userController.register);
routes.post('/users/login', userController.login);
routes.get('/users/logout', userController.logout);

export default routes;