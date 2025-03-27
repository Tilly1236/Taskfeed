import express from 'express';

import authentication from '../authentication/authentication.js';
import FeedInterface from './FeedInterface.js';

const feed = express.Router();

feed.use(authentication());


feed.post('/', (req, res) => {
	
	
	if (!req.body.groupid)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Request is not complete' });
	}
	if (!req.body.latest)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Request is not complete' });
	}
	if (!req.body.earliest)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Request is not complete' });
	}


	let listFeed

	try {
		listFeed = FeedInterface.getfeed(req.body.groupid, req.body.latest, req.body.earliest);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Internal Server Error");
	}
	
	return res.status(200).send(listFeed);
})


export default feed;