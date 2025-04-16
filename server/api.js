import {Router} from 'express';

import post from './posts/post.js';
import feed from './feed/feed.js';
import filter from './feed/filter.js';

const api = Router();

api.use('/post', post); // Uses the router object defined by the token which handles requests at "/post"
api.use('/feed', feed); // Uses the router object defined by the token which handles requests at "/feed"
api.use(`/filter`, filter); // Uses the router object defined by the token which handles requests at "/filter"

export default api;


