import Router from 'express'
import { validateRegister, validateLogin } from '../validator/auth.validator.js';
import { register, login, getMe, logout } from '../controllers/auth.controller.js';
import { authenticaUser } from '../middleware/auth.middleware.js';

const route = Router();


route.get('/test' , (req, res) => {
    res.json({message: 'Auth route is working'})
})

route.post('/register', validateRegister, register);

route.post('/login', validateLogin , login);

route.get('/get-me', authenticaUser , getMe);

route.post('/logout', authenticaUser, logout);

export default route