import {Router} from 'express';

import signup from './authentication/signup.js';
import login from './authentication/login.js';
import post from './posts/post.js';

const api = Router();

api.use('/signup', signup);
api.use('/login', login);
api.use('/post', post)

export default api;


