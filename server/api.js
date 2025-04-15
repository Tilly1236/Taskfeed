import {Router} from 'express';

import post from './posts/post.js';
import feed from './feed/feed.js';
import filter from './feed/filter.js';

const api = Router();

api.use('/post', post)
api.use('/feed', feed);
api.use(`/filter`, filter)

export default api;


