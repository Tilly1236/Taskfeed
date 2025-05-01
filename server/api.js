import {Router} from 'express';

import post from './posts/post.js';
import feed from './feed/feed.js';
import filter from './feed/filter.js';
import postcommment from './posts/postcomment.js';
import commentfeed from './feed/commentfeed.js';
import group from './groups/group.js';

const api = Router();

api.use('/post', post); // Uses the router object defined by the token which handles requests at "/post"
api.use('/comment', postcommment) // Uses the router object defined by the token which handles requests at "/comment"
api.use('/commentfeed', commentfeed) // Uses the router object defined by the token which handles requests at "/comment"
api.use('/feed', feed); // Uses the router object defined by the token which handles requests at "/feed"
api.use(`/filter`, filter); // Uses the router object defined by the token which handles requests at "/filter"
api.use('/group', group)

export default api;


