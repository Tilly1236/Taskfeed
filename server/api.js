import {Router} from 'express';
import signup from './authentication/signup.js';

const api = Router();

api.use('/signup', signup)

export default api;


