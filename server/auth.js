import {Router} from 'express';

import signup from './authentication/signup.js';
import login from './authentication/login.js';

const auth = Router();

auth.use('/signup', signup);
auth.use('/login', login);

export default auth;


