import {Router} from 'express';

import post from './posts/post.js';

const api = Router();

api.use('/post', post)

export default api;


