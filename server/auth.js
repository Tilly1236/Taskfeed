import {Router} from 'express';

import signup from './authentication/signup.js';
import login from './authentication/login.js';

const auth = Router();

auth.use('/signup', signup); // Uses the router object defined by the token which handles requests at "/signup"
auth.use('/login', login); // Uses the router object defined by the token which handles requests at "/login"

export default auth;


