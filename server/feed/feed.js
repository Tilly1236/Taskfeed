import express from 'express';

import authentication from '../authentication/authentication.js';
import FeedInterface from './FeedInterface.js';

const feed = express.Router();

feed.use(authentication());


feed.post('/', (req, res) => {
	
	if (!req.body.created_at)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Request is not complete' });
	}
	if (!req.body.groupid)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Request is not complete' });
	}


	let listFeed

	try {
		listFeed = FeedInterface.getfeed(req.body.created_at, req.body.groupid);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Internal Server Error");
	}
	
	return res.status(200).send(listFeed);
})


export default feed;