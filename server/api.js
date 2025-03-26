import {Router} from 'express';

import post from './posts/post.js';
import feed from './feed/feed.js';

const api = Router();

api.use('/post', post)
api.use('/feed', feed);

export default api;


