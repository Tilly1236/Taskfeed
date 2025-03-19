import {Router} from 'express';

import signup from './authentication/signup.js';
import login from './authentication/login.js';

const api = Router();

api.use('/signup', signup);
api.use('/login', login);

export default api;


