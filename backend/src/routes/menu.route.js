import Router from 'express';
import { getMenu, getMenuByRestaurantId } from '../controllers/menu.controller.js';

const route = Router();

route.get('/', getMenu);
route.get('/restaurant/:restaurantId', getMenuByRestaurantId);

export default route;
